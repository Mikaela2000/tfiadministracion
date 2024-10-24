import { FaTrashAlt } from "react-icons/fa";

const TableClient = () => {
    return (
        <div>
            <table class="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Correo Electronico</th>
                        <td>#</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan>Larry the Bird</td>
                        <td colspan>Larry the Bird</td>
                        <td>@twitter</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                        
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
export default TableClient;