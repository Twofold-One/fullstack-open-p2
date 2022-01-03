import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

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

const personsService = { getAll, create, deletePerson };
export default personsService;
