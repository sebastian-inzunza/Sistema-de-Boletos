const socket = io();



export const loadBoletos = (callback) =>{
    socket.on("server:loadBoletos", callback);
};


export const getBoletoById = (id) => {
    socket.emit("client:getBoleto", id);
};

export const onSelected = (callback) => {
    socket.on("server:selectedBoleto",callback);
};

export const updateBoleto = (id) => {
    socket.emit("client:updateBoleto",{
        _id: id,
        activo:true
    });
};

export const updateBoletoFalse = (id) => {
    console.log(id)
    socket.emit("client:updateBoletoFalse",{
        _id: id,
        activo:false
    });
};

export const insertFolio = (telefono, nombre, folio, boletos) => {
    socket.emit("client:newFolio", {
        telefono: telefono,
        nombre: nombre,
        folio: folio,
        boletos: boletos
    });
    console.log(boletos)
};





// export const loadNotes = (callback) => {
//     socket.on("server:loadNotes", callback);
// };

// export const saveNote = (titulo, descripcion) => {
//     socket.emit("client:newNote", {
//         titulo: titulo,
//         descripcion: descripcion,
//     });
// };

// export const onNewNote = (callback) => {
//     socket.on("server:newNote", callback);
// };

// export const deleteNote = (id) => {
//     socket.emit("client:deleteNote", id);
// };

// export const getNoteById = (id) => {
//     socket.emit("client:getNote", id);
// };

// export const onSelected = (callback) => {
//     socket.on("server:selectednote", callback);
// };

// export const updateNote = (id, titulo, descripcion) => {
//     socket.emit("client:updateNote", {
//         _id: id,
//         titulo,
//         descripcion,
//     });
// };
