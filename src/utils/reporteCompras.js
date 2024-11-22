import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generateReporteCompras = (compras, nameClient) => {
    const doc = new jsPDF();
    
    // Obtener la fecha actual
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    // Agregar el título
    doc.setFontSize(18); // Cambiar el tamaño de la fuente para el título
    doc.text("Reporte de Compras", 80, 10); // Título en la posición X=14, Y=10

    // Agregar la fecha actual
    doc.setFontSize(12); // Cambiar el tamaño de la fuente para la fecha
    doc.text(`Fecha: ${formattedDate}`, 14, 20); // Fecha en la posición X=14, Y=20

    doc.text(`Nombre del cliente: ${nameClient}`, 14, 30); 

    // Generar la tabla con los datos de las compras
    doc.autoTable({
        head: [['Compra ID', 'Software', 'Versión', 'Precio', 'Método de Pago']],
        body: compras.map(compra => [compra.id, compra.nameSoft, compra.version, compra.price, compra.metodoPago]),
        startY: 40, // Ajusta la posición Y de la tabla para que no se solape con la fecha
    });

    // Descargar el PDF
    doc.save('reporte_compras.pdf');
};
