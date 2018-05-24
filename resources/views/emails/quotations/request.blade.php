<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Pedido de cotización</h1>
  <h2>Cliente:</h2>
  <h4>Nombre Cliente: {{ $order->clientName }}</h4>
  <h4>Email Cliente: {{ $order->clientEmail }}</h4>
  <h2>Productos:</h2>
  <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
        </tr>
    </thead>
    <tbody>
         @foreach($order->products as $product)
          <tr>
              <td> {{ $product['id'] }} </td>
              <td> {{ $product['name'] }} </td>
          </tr>
         @endforeach
   </tbody>
   <h6>No contestar a este remitente. Los pedidos de cotización mediante web se hacen de manera automática.</h6>
   <h6>- Área de tecnología de itagrif.com</h6>
</table>
</body>
</html>