const socket = io();

export const loadBoletos = (callback) => {
  socket.on("server:loadBoletos", callback);
};

export const getBoletoById = (id) => {
  socket.emit("client:getBoleto", id);
};

export const onSelected = (callback) => {
  socket.on("server:selectedBoleto", callback);
};

export const updateBoleto = (id) => {
  socket.emit("client:updateBoleto", {
    _id: id,
    activo: true,
  });
};

export const updateBoletoFalse = (id) => {

  socket.emit("client:updateBoletoFalse", {
    _id: id,
    activo: false,
  });
};

export const deleteComprado = (id) => {

  socket.emit("client:deleteComprado", {
    id: id,
  });
};

export const insertFolio = (telefono, nombre, folio, boletos,estado, fechaHora) => {
  socket.emit("client:newFolio", {
    telefono: telefono,
    nombre: nombre,
    folio: folio,
    boletos: boletos,
    estado: estado,
    fechaHora: fechaHora,
  });

};


export const inserVerificado = (telefono, nombre, folio, boletos, estado, fechaHora, fechaComprado) => {
  socket.emit("client:newVeri", {
    telefono: telefono,
    nombre: nombre,
    folio: folio,
    boletos: boletos,
    estado: estado,
    fechaHora: fechaHora,
    fechaComprado:fechaComprado
  });

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
