SELECT * FROM carrito;

SELECT * FROM categorias;
SELECT * FROM detalle_pedido;
SELECT * FROM pedidos;
SELECT * FROM productos;
SELECT * FROM usuarios;

SELECT id, nombre, imagen_url FROM categorias;

ALTER TABLE categorias
ADD COLUMN imagen_url VARCHAR(255);

INSERT INTO usuarios ( nombre, apellido, email, password, direccion, telefono, rol ) 
VALUES ('Jose angel', 'Pacheco', 'joseangelpb@gmail.com', '$2b$10$JxjsPgaO3GTu13B5iXDXA.ac2thdIk9n3hxz5bFc3W5vpXqmfx3Jq',
    'santiago', '667899876', 'admin');


UPDATE usuarios
SET 
    password = '$2b$10$JxjsPgaO3GTu13B5iXDXA.ac2thdIk9n3hxz5bFc3W5vpXqmfx3Jq',
    nombre = 'Jose'
WHERE 
    email = 'josepacheco73@hotmail.com';



UPDATE categorias SET imagen_url = 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d1bddf788d79d2af39323dc484f2f59e.jpg' WHERE nombre = 'Ropa Invierno';

UPDATE categorias SET imagen_url = 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' WHERE nombre = 'Ropa Casual';

UPDATE categorias SET imagen_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs8s88OdNDJN3JdMMlSsNmvq7gxlOKzozxPg&s' WHERE nombre = 'Joyería';

UPDATE categorias SET imagen_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCNxelfItVE0-Pgcf_FElvU_YpWNoim1v00BSIW3NKG_Ov4vQchRftc8sc3bryXEP5ruQ&usqp=CAU' WHERE nombre = 'Accesorios';

UPDATE categorias SET imagen_url = 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' WHERE nombre = 'Ropa Formal';

INSERT INTO categorias (nombre, imagen_url) VALUES
('Ropa Invierno', 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d1bddf788d79d2af39323dc484f2f59e.jpg'),
('Ropa Casual', 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Joyería', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs8s88OdNDJN3JdMMlSsNmvq7gxlOKzozxPg&s'),
('Accesorios', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCNxelfItVE0-Pgcf_FElvU_YpWNoim1v00BSIW3NKG_Ov4vQchRftc8sc3bryXEP5ruQ&usqp=CAU'),
('Ropa Formal', 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');

INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id) VALUES
('Abrigo de Lana Cruzado', 'Doble botonadura, 80% lana, color carbón.', 185.00, 30, 'RPI-ABR046', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7HrSCPZoH1QP3YswHbwCIZHQlpBZQpCFSpEfHZAqewWLuQFVgSTpwf-XRpNXVUKlTPQ&usqp=CAU', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Gorro Tejido con Pompon', 'Acrílico suave, doble capa para mayor calidez.', 22.99, 120, 'RPI-GOR047', 'https://cl.todomoda.com/media/catalog/product/8/2/82567501_0_1_20250514120707.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=841&width=657&canvas=657:841', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Guantes de Piel con Forro', 'Piel de cordero, forro interior de seda, táctiles.', 55.00, 90, 'RPI-GNT048', 'https://static.pool.cl/img/p/xl/64f53843-a284-4b86-ac27-add59fb31905.jpg', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Parka Acolchada Térmica', 'Capucha desmontable con pelo sintético.', 140.75, 50, 'RPI-PAR049', 'https://i5.walmartimages.cl/asr/e1ed38ae-fb48-41e1-acf1-3e5cd86ae148.1e7029d38e797e9497183c766b94f6b7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Calzas Térmicas para Nieve', 'Capa base, alta retención de calor, transpirables.', 38.50, 75, 'RPI-CLZ050', 'https://www.aquadelta.com.ar/img/articulos/2024/05/imagen1_calza_larga_freeky_thermal_fleece_imagen11.webp', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Jersey Cuello Alto Cashmere', 'Tejido grueso, 100% Cashmere, color azul marino.', 199.90, 20, 'RPI-JCA051', 'https://againcashmere.com/cdn/shop/files/jersey-cuello-alto-mujer-cashmere-081100.jpg?v=1757668797&width=1000', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Bufanda Larga de Cuadros', 'Tejido grueso, mezcla de lana, estilo escocés.', 45.00, 100, 'RPI-BFC052', 'https://images.vestiairecollective.com/images/resized/w=1246,q=75,f=auto,/produit/panuelos-bufandas-burberry-de-cachemira-multicolor-41300530-3_2.jpg', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Botas de Nieve Impermeables', 'Suela gruesa, interior polar, resistentes a -20°C.', 129.99, 40, 'RPI-BTN053', 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d1bddf788d79d2af39323dc484f2f59e.jpg', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Manta Poncho con Flecos', 'Oversize, mezcla de acrílico y lana.', 72.50, 60, 'RPI-MPO054', 'https://images.unsplash.com/photo-1569713198045-f8a69393f3d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg4fHxNYW50YSUyMFBvbmNobyUyMGNvbiUyMEZsZWNvc3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1)),
('Chaleco Acolchado Ligero', 'Se guarda en una bolsa pequeña, relleno sintético.', 68.00, 85, 'RPI-CHA055', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5TH8hxwOxLnM4wF31ik0rciP9wQ-M6T79UA&s', (SELECT id FROM categorias WHERE nombre = 'Ropa Invierno' LIMIT 1));

INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id) VALUES
('Collar de Plata 925', 'Cadena fina con dije de corazón, bañado en rodio.', 68.00, 60, 'JOY-CLL041', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs8s88OdNDJN3JdMMlSsNmvq7gxlOKzozxPg&s', (SELECT id FROM categorias WHERE nombre = 'Joyería' LIMIT 1)),
('Pulsera de Cuero Trenzado', 'Cierre magnético de acero inoxidable, unisex.', 29.99, 80, 'JOY-PLS042', 'https://clockcol.com/cdn/shop/files/PULSERA-TRENZADA-CUERO-NEGRO.jpg?v=1731784987', (SELECT id FROM categorias WHERE nombre = 'Joyería' LIMIT 1)),
('Anillo de Compromiso Oro Blanco', 'Diamante cultivado de 0.5 quilates, diseño solitario.', 750.00, 10, 'JOY-ANI043', 'https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/22136alegra05-n/diamond/lab-grown-diamond_AAA/stone2/lab-grown-diamond_AAA/alloycolour/white.jpg?width=220&height=220', (SELECT id FROM categorias WHERE nombre = 'Joyería' LIMIT 1)),
('Pendientes de Perlas Cultivadas', 'Cierre de mariposa, perlas naturales de 8mm.', 45.50, 75, 'JOY-PEN044', 'https://i.etsystatic.com/26016778/r/il/0a1e0f/3357378819/il_570xN.3357378819_nmum.jpg', (SELECT id FROM categorias WHERE nombre = 'Joyería' LIMIT 1)),
('Reloj Clásico de Pulsera', 'Correa de malla de acero, dial minimalista.', 119.90, 50, 'JOY-RLJ045', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_DU6VEWRJWiOdazYvyAJnSgBAdC3vxdLtw&s', (SELECT id FROM categorias WHERE nombre = 'Joyería' LIMIT 1));

INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id) VALUES
('Cinturón de Cuero Reversible', 'Piel genuina, hebilla metálica giratoria.', 39.90, 100, 'ACC-CNT036', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZnlr0teNs3BSxKIpl80MIvBTgLNvLc9gQpbs74cF-D2_0E0Zwu7nGiL6HoQr25nEbZ6o&usqp=CAU', (SELECT id FROM categorias WHERE nombre = 'Accesorios' LIMIT 1)),
('Billetera Minimalista RFID', 'Bloqueo RFID, cuero vegano, capacidad para 6 tarjetas.', 25.00, 120, 'ACC-BIL037', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAepYQBaGJajN30NlL1QpF5svFNAvumCkVP_q495KHY-aCwteRfxgqQ-1y-LO63P-kr7U&usqp=CAU', (SELECT id FROM categorias WHERE nombre = 'Accesorios' LIMIT 1)),
('Bufanda de Cashmere Pura', 'Suave al tacto, 100% Cashmere, color camel.', 85.00, 45, 'ACC-BUF038', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVNUiOX1Emj_24Jg-9mr8jOae-QJo18aGgGcloEBBsPHHipOZSC7e5rP3i2acAFi-AA4&usqp=CAU', (SELECT id FROM categorias WHERE nombre = 'Accesorios' LIMIT 1)),
('Gafas de Sol Polarizadas', 'Marco de acetato, protección UV400, estilo aviador.', 49.99, 85, 'ACC-GSF039', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCNxelfItVE0-Pgcf_FElvU_YpWNoim1v00BSIW3NKG_Ov4vQchRftc8sc3bryXEP5ruQ&usqp=CAU', (SELECT id FROM categorias WHERE nombre = 'Accesorios' LIMIT 1)),
('Set de 3 Pañuelos de Bolsillo', 'Seda italiana, patrones geométricos surtidos.', 32.50, 70, 'ACC-PAN040', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH1oH0e_NOpSOSMA4F42G6_vPXm4Cm9kcfIhuJS4re65_L6UhM5oKmvgx2_P9o3SFv3To&usqp=CAU', (SELECT id FROM categorias WHERE nombre = 'Accesorios' LIMIT 1));

INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id) VALUES
('Traje Sastre Negro', 'Lana virgen italiana, corte slim fit, 2 piezas.', 299.00, 20, 'RPF-TRA011', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQTbYN8MzPw-xyE09_USo6uFGUeG01dBySreerJ-zOad1fSCW7ljb9ZaNQA6WBeFnfOVMvKXST913oRXq2hIi1K0dHTp0uaGV6uh79NaF1CqgGerpmhjGR4&usqp=CAc', (SELECT id FROM categorias WHERE nombre = 'Ropa Formal' LIMIT 1)),
('Blusa de Gasa Beige', 'Cuello alto, mangas abullonadas, tejido ligero.', 69.95, 35, 'RPF-BLS012', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvATnVrRd61iAJ-tBWqJW-0hKTr8D8Kw0vtPwjqojdnzGVkGeH4aQd8rCERw&s', (SELECT id FROM categorias WHERE nombre = 'Ropa Formal' LIMIT 1)),
('Corbata de Seda Pura', 'Patrón geométrico, color azul marino, hecha a mano.', 45.00, 50, 'RPF-CRB013', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe2nEzicHtrC25hbRNHj0_WHrTMLayUMGPRg&s', (SELECT id FROM categorias WHERE nombre = 'Ropa Formal' LIMIT 1)),
('Pantalón de Vestir Gris', 'Lana fría, corte recto, pinzas frontales.', 95.50, 40, 'RPF-PNV014', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4o2U6kRiSCK3TF908NLUL97YvN_9x0Ghk_lFJspooJMcIEC0nkLxrgOc&s', (SELECT id FROM categorias WHERE nombre = 'Ropa Formal' LIMIT 1)),
('Americana Larga Azul', 'Estructurada, botones dorados, forro de satén.', 130.00, 25, 'RPF-AME015', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuG5aLaMx20BG7XNuq6Z2REQhn026792koYA&s', (SELECT id FROM categorias WHERE nombre = 'Ropa Formal' LIMIT 1));

INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id) VALUES
('Polera Básica Algodón', '100% algodón orgánico, cuello redondo, unisex.', 25.99, 150, 'RPC-POL001', 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Jeans Slim Fit Oscuro', 'Denim elástico, corte ajustado, color azul índigo.', 65.00, 80, 'RPC-JNS002', 'https://images.pexels.com/photos/428241/pexels-photo-428241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Sudadera con Capucha', 'Interior afelpado, bolsillo canguro, gris jaspeado.', 55.50, 100, 'RPC-SUD003', 'https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Vestido de Verano Floral', 'Tela ligera, corte A, ideal para clima cálido.', 42.75, 60, 'RPC-VES004', 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Camisa de Lino Blanco', 'Manga larga, transpirable, corte regular.', 59.90, 70, 'RPC-CAM005', 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Shorts Deportivos Negros', 'Malla transpirable, secado rápido, cordón ajustable.', 30.00, 110, 'RPC-SHO006', 'https://images.pexels.com/photos/428331/pexels-photo-428331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Blusa de Seda Estampada', 'Elegante, manga 3/4, cuello en V.', 79.99, 50, 'RPC-BLU007', 'https://images.pexels.com/photos/428329/pexels-photo-428329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Cárdigan de Lana Fina', 'Botones frontales, cuello en pico, color beige.', 85.20, 40, 'RPC-CAR008', 'https://images.pexels.com/photos/3748225/pexels-photo-3748225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Pantalón Chino Beige', 'Corte recto, tela cómoda, ideal para oficina casual.', 58.50, 90, 'RPC-PNC009', 'https://images.pexels.com/photos/428327/pexels-photo-428327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Falda Midi Plisada', 'Poliéster ligero, cintura elástica, color burdeos.', 47.30, 65, 'RPC-FAL010', 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs*tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1));


('Sudadera con Capucha', 'Interior afelpado, bolsillo canguro, gris jaspeado.', 55.50, 100, 'RPC-SUD003', 'https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Shorts Deportivos Negros', 'Malla transpirable, secado rápido, cordón ajustable.', 30.00, 110, 'RPC-SHO006', 'https://images.pexels.com/photos/428331/pexels-photo-428331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Pantalón Chino Beige', 'Corte recto, tela cómoda, ideal para oficina casual.', 58.50, 90, 'RPC-PNC009', 'https://images.pexels.com/photos/428327/pexels-photo-428327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),
('Jeans Slim Fit Oscuro', 'Denim elástico, corte ajustado, color azul índigo.', 65.00, 80, 'RPC-JNS002', 'https://images.pexels.com/photos/428241/pexels-photo-428241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', (SELECT id FROM categorias WHERE nombre = 'Ropa Casual' LIMIT 1)),

https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQicF6dlg7-WiGwXdQiJHQWMQJr9I_LuLbeNg&s
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9pbuX9kCE3nPCcMltLREkKYBHSM7Xbev_xQ&s
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu93RI_bt4W4tSBry8Iz6VwhuRXpw-Orlmdg&s
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DVTpJGTRS7tB89ImoWxmSDWXglVZP0EpDw&s