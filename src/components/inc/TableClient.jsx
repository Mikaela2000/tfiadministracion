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
                        <td>Juan López</td>
                        <td>381456456</td>
                        <td>juan@gmail.com</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob Thornton</td>
                        <td>3814477888</td>
                        <td>jacob@gmail.com</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan>Larry S</td>
                        <td colspan>325546855</td>
                        <td>larry@gmail.com</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                        
                    </tr>

                    <tr>
                        <th scope="row">4</th>
                        <td colspan>Lucas M</td>
                        <td colspan>55548846</td>
                        <td>lucas@gmail.com</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                        
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td colspan>Camila L</td>
                        <td colspan>43244444</td>
                        <td>camila@gmail.com</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                        
                    </tr>

                    <tr>
                        <th scope="row">6</th>
                        <td colspan>Lucia R</td>
                        <td colspan>54564888</td>
                        <td>lucia@gmail.com</td>
                        <td><FaTrashAlt></FaTrashAlt></td>
                        
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
export default TableClient;