// src/services/firestoreService.js
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const firestoreService = {
  // Posts operations
  posts: {
    // Create a new post
    create: async (postData) => {
      try {
        const docRef = await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return { id: docRef.id, error: null };
      } catch (error) {
        return { id: null, error: error.message };
      }
    },

    // Get all posts
    getAll: async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        return { posts, error: null };
      } catch (error) {
        return { posts: [], error: error.message };
      }
    },

    // Get single post
    getById: async (postId) => {
      try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          return { post: { id: docSnap.id, ...docSnap.data() }, error: null };
        } else {
          return { post: null, error: 'Post not found' };
        }
      } catch (error) {
        return { post: null, error: error.message };
      }
    },

    // Update post
    update: async (postId, updates) => {
      try {
        const docRef = doc(db, 'posts', postId);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: serverTimestamp()
        });
        return { error: null };
      } catch (error) {
        return { error: error.message };
      }
    },

    // Delete post
    delete: async (postId) => {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        return { error: null };
      } catch (error) {
        return { error: error.message };
      }
    },

    // Get posts by user
    getByUser: async (userId) => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('authorId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        return { posts, error: null };
      } catch (error) {
        return { posts: [], error: error.message };
      }
    },

    // Real-time listener for posts
    onSnapshot: (callback) => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        callback(posts);
      });
    }
  },

  // Comments operations
  comments: {
    // Add comment to a post
    create: async (postId, commentData) => {
      try {
        const docRef = await addDoc(collection(db, 'comments'), {
          ...commentData,
          postId,
          createdAt: serverTimestamp()
        });
        return { id: docRef.id, error: null };
      } catch (error) {
        return { id: null, error: error.message };
      }
    },

    // Get comments for a post
    getByPost: async (postId) => {
      try {
        const q = query(
          collection(db, 'comments'),
          where('postId', '==', postId),
          orderBy('createdAt', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const comments = [];
        querySnapshot.forEach((doc) => {
          comments.push({ id: doc.id, ...doc.data() });
        });
        return { comments, error: null };
      } catch (error) {
        return { comments: [], error: error.message };
      }
    },

    // Real-time listener for post comments
    onSnapshot: (postId, callback) => {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'asc')
      );
      return onSnapshot(q, (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
          comments.push({ id: doc.id, ...doc.data() });
        });
        callback(comments);
      });
    }
  }
};