import Note from "./models/Note";
import Boleto from "./models/Boletos";
import Comprados from "./models/Comprados";
import Users from "./models/Users";
import Verificados from "./models/Verificados";




export default (io) => {
  io.on("connection", (socket) => {

  
    const emitBoletos = async () => {
      const boletos = await Boleto.find();
      io.emit("server:loadBoletos", boletos);
    };
    emitBoletos();

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
    
      await Boleto.findByIdAndUpdate(updateBoleto._id, {
        activo: updateBoleto.activo,
      });
      emitBoletos();
    });

    
    socket.on("client:deleteComprado", async (data) => {
      try {
        const id = data.id;
        // Realizar la operación de eliminación en MongoDB
        await Comprados.findByIdAndDelete(id);
        // Emitir un evento de éxito para informar al cliente que la eliminación fue exitosa
        socket.emit('eliminacionExitosa');
      } catch (error) {
        // Emitir un evento de error en caso de que ocurra un problema durante la eliminación
        socket.emit('eliminacionError', { error: error.message });
      }
    });

        socket.on("client:newFolio", async (data) => {
          const newFolio = new Comprados({
            telefono: data.telefono,
            nombre: data.nombre,
            folio: data.folio,
            boletos: data.boletos,
            estado: data.estado,
            fechaHora: data.fechaHora
          });
          const saveFolio= await newFolio.save();
         
          // io.emit("server:newNote", saveNote)
      });

      socket.on("client:newVeri", async (data) => {
        const newFolio = new Verificados({
          telefono: data.telefono,
          nombre: data.nombre,
          folio: data.folio,
          boletos: data.boletos,
          estado: data.estado,
          fechaHora: data.fechaHora,
          fechaComprado: data.fechaComprado

        });
        const saveFolio= await newFolio.save();
        console.log(saveFolio)
        // io.emit("server:newNote", saveNote)
    });


    socket.on
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
