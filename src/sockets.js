import Note from "./models/Note";
import Boleto from "./models/Boletos";
import Comprados from "./models/Comprados";

export default (io) => {
  io.on("connection", (socket) => {

    const socketsConectados = io.engine.clientsCount;
    console.log('Cantidad de sockets conectados:', socketsConectados);

  
    const emitBoletos = async () => {
      const boletos = await Boleto.find();
      io.emit("server:loadBoletos", boletos);
    };
    emitBoletos();

    if(socketsConectados > 1){
      const emitBoletos2 = async () => {
        const boletos = await Boleto.find();
        io.emit("server:loadBoletos", boletos);
      };

    emitBoletos2()

    }
    

    socket.on("client:getBoleto", async (id) => {
      const boleto = await Boleto.findById(id);
      io.emit("server:selectedBoleto", boleto);
    });

    socket.on("client:updateBoleto", async (updateBoleto) => {
      await Boleto.findByIdAndUpdate(updateBoleto._id, {
        activo: updateBoleto.activo,
      });
      emitBoletos();
    });

    socket.on("client:updateBoletoFalse", async (updateBoleto) => {
      console.log(updateBoleto);
      await Boleto.findByIdAndUpdate(updateBoleto._id, {
        activo: updateBoleto.activo,
      });
      emitBoletos();
    });


        socket.on("client:newFolio", async (data) => {
          const newFolio = new Comprados({
            telefono: data.telefono,
            nombre: data.nombre,
            folio: data.folio,
            boletos: data.boletos
          });
          const saveFolio= await newFolio.save();
          console.log(saveFolio)
          // io.emit("server:newNote", saveNote)
      });

  });

  
  // io.on("connection", (socket) => {
  //     const emitNotes = async () => {
  //         const notes = await Note.find();

  //         io.emit("server:loadNotes", notes);
  //     };
  //     emitNotes();

  //     socket.on("client:newNote", async (data) => {
  //         const newNote = new Note({
  //             title: data.titulo,
  //             description: data.descripcion,
  //         });
  //         const saveNote = await newNote.save();
  //         console.log(saveNote)
  //         io.emit("server:newNote", saveNote)
  //     });

  //     socket.on("client:deleteNote", async  (id) =>{
  //         await Note.findByIdAndDelete(id)
  //         emitNotes()
  //     })

  //     socket.on("client:getNote", async (id) =>{
  //         const note = await Note.findById(id)
  //         io.emit("server:selectednote", note)
  //     })

  //     socket.on("client:updateNote",  async(updateNote)=>{
  //         await Note.findByIdAndUpdate(updateNote._id, {
  //             title: updateNote.titulo,
  //             description: updateNote.descripcion
  //         })
  //         emitNotes()
  //     })
  // });
};
