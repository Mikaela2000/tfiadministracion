import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const TableClient = ({ options, onOptionClick }) => {
    const clients = [
        { id: 1, name: "Juan López", phone: "381456456", email: "juan@gmail.com" },
        { id: 2, name: "Jacob Thornton", phone: "3814477888", email: "jacob@gmail.com" },
        { id: 3, name: "Larry S", phone: "325546855", email: "larry@gmail.com" },
        { id: 4, name: "Lucas M", phone: "55548846", email: "lucas@gmail.com" },
        { id: 5, name: "Camila L", phone: "43244444", email: "camila@gmail.com" },
        { id: 6, name: "Lucia R", phone: "54564888", email: "lucia@gmail.com" }
    ];

    return (
        <div>
            <table className="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Correo Electronico</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <th scope="row">{client.id}</th>
                            <td>{client.name}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                            <td>
                                {options.map((Option, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => onOptionClick(client.id, Option.type)}
                                        style={{ height: 40, padding: '0 10px', marginRight: 5 }}
                                    >
                                        {<Option.icon />}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableClient;