--Consulta de seleccion
SELECT * FROM  ;

SELECT * FROM  WHERE id = $1;

SELECT * FROM Usuarios;

SELECT * FROM Categorias;

SELECT * FROM Productos;

SELECT * FROM Pedidos;

SELECT * FROM DetallePedido;

--Eliminacion de registros
DELETE FROM   WHERE id = $1;

--Inseccion de registros
INSERT INTO  () VALUES($1,$2,$3) RETURNING *;

INSERT INTO Usuarios () VALUES($1,) RETURNING *;





