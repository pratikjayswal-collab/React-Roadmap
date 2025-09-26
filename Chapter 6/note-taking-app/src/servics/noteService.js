import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "notes";

export const noteService = {
  // Get all notes for a specific user
  getNotes: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      return notes;
    } catch (error) {
      console.error("Error getting notes:", error);
      throw error;
    }
  },

  // Add a new note
  addNote: async (userId, text) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        text,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Return the created note with id
      return {
        id: docRef.id,
        text,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  },

  // Update a note
  updateNote: async (noteId, text) => {
    try {
      const noteRef = doc(db, COLLECTION_NAME, noteId);
      await updateDoc(noteRef, {
        text,
        updatedAt: serverTimestamp()
      });
      return { id: noteId, text, updatedAt: new Date() };
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (noteId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
};