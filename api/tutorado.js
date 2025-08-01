import tutorado from '../tutorado.json';

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const { id, search } = req.query;

        if (search) {
            const searchTerm = search.toString().toLowerCase();
            const resultados = tutorado.filter(t => 
                t.matricula.toString().toLowerCase().includes(searchTerm)
            );
            return res.status(200).json(resultados);
        }

        if (id) {
            const tutoradoEncontrado = tutorado.find(t => t.id === Number(id));
            
            if (tutoradoEncontrado) {
                return res.status(200).json(tutoradoEncontrado);
            } else {
                return res.status(404).json({ message: 'Tutorado no encontrado' });
            }
        }

        return res.status(200).json(tutorado);
    }

    return res.status(405).json({ message: 'Método no permitido' });
}