# Informe de Laboratorio 01: Experimento A/B de Landing con URL Canónica Única

**Asignatura:** Programación Avanzada (2026)  
**Institución:** UADER FCyT  
**Estudiante:** Agustín Viale  

---

### 1. Elementos visualizados por una persona asignada a la Variante B
Cuando un usuario es asignado a la variante B (tratamiento), la interfaz renderiza los siguientes elementos:
* **Titular:** "El curso empieza el 14 de abril. El cupo, no."
* **Llamado a la acción (CTA):** "Reservar mi lugar"
* **Title (Metadato HTML):** `Abril abre cupos: cursos de oficio en grupos de 12` (50 caracteres).
* **Description (Metadato HTML):** `El 14 de abril empiezan grupos de doce. En la cohorte anterior, ocho de cada diez consiguieron trabajo en el rubro antes de los noventa días.` (141 caracteres).

**Propuesta comercial inalterada (Oferta):** La oferta subyacente se mantuvo estrictamente idéntica a la variante A de control: fecha de inicio (14 de abril), duración (8 semanas), cupo (12 personas) y disciplinas dictadas (carpintería, electricidad y cocina).

---

### 2. Comportamiento esperado frente a un Crawler (Buscador)
Un crawler de motores de búsqueda (como Googlebot) debe recibir **siempre la variante A (control)**. 

Dado que los buscadores no suelen almacenar ni enviar cookies entre solicitudes, si el servidor ejecutara un sorteo aleatorio sin cookie en cada petición, el crawler indexaría contenido inestable y variable. Al fijar el control para requests sin cookie, garantizamos un contenido HTML consistente y predecible en el servidor sin recurrir a técnicas de *cloaking* perjudiciales.

---

### 3. Justificación de la URL Canónica Fija
El elemento `<link rel="canonical">` apunta en todo momento a `https://taller-norte.edu.ar/practica`, prescindiendo de parámetros como `?preview=` o de subrutas independientes.

Ambas variantes comunican exactamente la misma oferta y producto. Si se crearan URLs independientes (ej. `/variante-a` y `/variante-b`) o se canonizaran queries, el buscador trataría la landing como páginas duplicadas. Esto fragmentaría la autoridad de dominio (*PageRank*) y diluiría la indexación del sitio.

---

### 4. Función de Hash Determinística y Verificación de Estabilidad
Para la asignación determinística de variantes se implementó el algoritmo de **Hash FNV-1a (32-bit)** sobre el identificador del visitante (`visitor_id`).

* **Algoritmo:** FNV-1a 32-bit Hash modulo 2.
* **Identificador de prueba:** `lab-visitor-demo-01`
* **Resultado obtenido:** Mapea de forma determinística siempre a la **Variante A** (Control).
* **Verificación de estabilidad:** La evaluación consecutiva de `lab-visitor-demo-01` bajo la función retorna invariablemente el valor `a`, garantizando idempotencia absoluta y consistencia de asignación para el usuario.
