import Note from "./models/Note";

export default (io) => {
    io.on("connection", (socket) => {
        const emitNotes = async () => {
            const notes = await Note.find();

            io.emit("server:loadNotes", notes);
        };
        emitNotes();

        socket.on("client:newNote", async (data) => {
            const newNote = new Note({
                title: data.titulo,
                description: data.descripcion,
            });
            const saveNote = await newNote.save();
            console.log(saveNote)
            io.emit("server:newNote", saveNote)
        });

        socket.on("client:deleteNote", async  (id) =>{
            await Note.findByIdAndDelete(id)
            emitNotes()
        })

        socket.on("client:getNote", async (id) =>{
            const note = await Note.findById(id)
            io.emit("server:selectednote", note)
        })

        socket.on("client:updateNote",  async(updateNote)=>{
            await Note.findByIdAndUpdate(updateNote._id, {
                title: updateNote.titulo,
                description: updateNote.descripcion
            })
            emitNotes()
        })
    });
};
