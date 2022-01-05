import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const create = async (newObject: {
    id?: number;
    name: string;
    number: string;
}) => {
    const request = axios.post(baseUrl, newObject);
    const response = await request;
    return response.data;
};

const deletePerson = async (id: string) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

const replace = async (
    id: string,
    newObject: {
        id?: number;
        name: string;
        number: string;
    }
) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
};

const personsService = { getAll, create, deletePerson, replace };
export default personsService;
