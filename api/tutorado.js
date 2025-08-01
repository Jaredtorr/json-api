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

        // Endpoint para buscar por matrícula
        if (search) {
            const searchTerm = search.toString().toLowerCase();
            const resultados = tutorado.filter(t => 
                t.matricula.toString().toLowerCase().includes(searchTerm)
            );
            return res.status(200).json(resultados);
        }

        // Endpoint para obtener por ID
        if (id) {
            const tutoradoEncontrado = tutorado.find(t => t.id === Number(id));
            
            if (tutoradoEncontrado) {
                return res.status(200).json(tutoradoEncontrado);
            } else {
                return res.status(404).json({ message: 'Tutorado no encontrado' });
            }
        }

        // Endpoint para obtener todos
        return res.status(200).json(tutorado);
    }

    return res.status(405).json({ message: 'Método no permitido' });
}