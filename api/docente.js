import docente from '../docente.json';

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
            const resultados = docente.filter(d => 
                d.matricula?.toString().toLowerCase().includes(searchTerm) ||
                d.nombre?.toLowerCase().includes(searchTerm)
            );
            return res.status(200).json(resultados);
        }

        if (id) {
            const docenteEncontrado = docente.find(d => d.id === Number(id));
            
            if (docenteEncontrado) {
                return res.status(200).json(docenteEncontrado);
            } else {
                return res.status(404).json({ message: 'Docente no encontrado' });
            }
        }

        return res.status(200).json(docente);
    }

    return res.status(405).json({ message: 'Método no permitido' });
}
