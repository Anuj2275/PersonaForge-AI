import api from "./axios";

export const getPersonas = () =>
    api.get("/personas/paged?page=0&size=10");

export const createPersona = (data) =>
    api.post("/personas", data);

export const getPersonaById = (id) =>
    api.get(`/personas/${id}`);