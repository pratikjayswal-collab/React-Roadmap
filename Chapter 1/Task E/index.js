const obj = {
    title: "Satya na proyogo",
    author: "Mohan Das Gandhi",
    summary: function(){
        console.log(`"${this.title}" is written by "${this.author}"`)
    }
}

obj.summary()