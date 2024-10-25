import { FaTrashAlt } from "react-icons/fa";
import style from "./HistorialCompras.module.css";

const HistorialCompras = () => {
    return (
        <div className={style.container}>
            <h2>Historial Compras</h2>

            <div class="mb-5 w-100 text-center">
                <form>
                    <input
                        class="rounded-2 px-2 py-2"
                        type="text"
                        required
                        placeholder="🔍"
                    />
                    <button class="btn btn-secondary ms-2" type="submit">Buscar</button>
                </form>
            </div>

            <table class="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre del Software</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Versión</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Metodo de pago</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Disney +</td>
                        <td>insdaasdadddddddddddd</td>
                        <td>v1.0</td>
                        <td>USD 3.000</td>
                        <td>Transferencia</td>

                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Disney +</td>
                        <td>insdaasdadddddddddddd</td>
                        <td>v1.1</td>
                        <td>USD 1.500</td>
                        <td>Transferencia</td>

                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Disney +</td>
                        <td>insdaasdadddddddddddd</td>
                        <td>v1.2</td>
                        <td>USD 1.200</td>
                        <td>Transferencia</td>

                    </tr>

                    <tr>
                        <th scope="row">4</th>
                        <td>Disney +</td>
                        <td>insdaasdadddddddddddd</td>
                        <td>v2.0</td>
                        <td>USD 1.000</td>
                        <td>Transferencia</td>


                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Disney +</td>
                        <td>insdaasdadddddddddddd</td>
                        <td>v2.1</td>
                        <td>USD 1.100</td>
                        <td>Transferencia</td>


                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default HistorialCompras;