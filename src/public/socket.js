const socket = io();

export const loadNotes = (callback) => {
    socket.on("server:loadNotes", callback);
};

export const saveNote = (titulo, descripcion) => {
    socket.emit("client:newNote", {
        titulo: titulo,
        descripcion: descripcion,
    });
};

export const onNewNote = (callback) => {
    socket.on("server:newNote", callback);
};

export const deleteNote = (id) => {
    socket.emit("client:deleteNote", id);
};

export const getNoteById = (id) => {
    socket.emit("client:getNote", id);
};

export const onSelected = (callback) => {
    socket.on("server:selectednote", callback);
};

export const updateNote = (id, titulo, descripcion) => {
    socket.emit("client:updateNote", {
        _id: id,
        titulo,
        descripcion,
    });
};
