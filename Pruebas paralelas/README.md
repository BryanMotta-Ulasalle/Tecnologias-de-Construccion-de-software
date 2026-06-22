# Pruebas Paralelas con pytest

El `pytest` es una herramienta de prueba extremadamente popular y versátil para Python. A partir de la versión 6.0, `pytest` introdujo la capacidad de ejecutar pruebas en paralelo, lo que puede acelerar significativamente el tiempo de ejecución de grandes conjuntos de pruebas.

```sh
pip install pytest pytest-xdist
```

## Ejemplo de Prueba Paralela

Supongamos que tenemos un archivo de prueba llamado `test_calculadora.py` con las siguientes funciones:

```python
# test.py

def test_1():
    print("\nIniciando Test 1")
    time.sleep(3)
    print("Finalizando Test 1")
    assert True

def test_2():
    print("\nIniciando Test 2")
    time.sleep(3)
    print("Finalizando Test 2")
    assert True
```

Para ejecutar estas pruebas en paralelo, usamos el comando `pytest` con la opción `-n NUM`, donde `NUM` es el número de procesos paralelos que deseas utilizar. Por ejemplo, para usar 2 procesos paralelos:

```sh
pytest -n 2 test.py
```

## Resultados Esperados

El comando anterior ejecutará las pruebas en dos procesos diferentes y mostrará los resultados de forma concisa. Aquí tienes un ejemplo de cómo se verían los resultados:

### Con pruebas paralelas:
```
============================= test session starts ==============================
platform win32 -- Python 3.11.5, pytest-9.1.1, pluggy-1.6.0
rootdir: C:\Users\user\Documents\Tecnologias-de-Construccion-de-software\Pruebas paralelas
plugins: xdist-3.8.0
2 workers [2 items]     
..

============================== 2 passed in 3.66s ===============================
```

### Sin pruebas paralelas:
```
============================= test session starts ==============================
platform win32 -- Python 3.11.5, pytest-9.1.1, pluggy-1.6.0
rootdir: C:\Users\user\Documents\Tecnologias-de-Construccion-de-software\Pruebas paralelas
plugins: xdist-3.8.0
collected 2 items                                                                                                                                                                                          

test.py 
Iniciando Test 1
Finalizando Test 1
.
Iniciando Test 2
Finalizando Test 2
.

============================== 2 passed in 6.02s  ===============================
```

Como puedes ver, `pytest` ejecuta cada una de las pruebas en un proceso diferente y muestra los resultados en tiempo real.

## Beneficios del Ejecución Paralela

- **Tiempo de Ejecución Reducido**: Las pruebas se ejecutan en paralelo, lo que reduce el tiempo total necesario para completar todas las pruebas.
- **Evaluación Concurrente**: Permite una evaluación concurrente de diferentes partes del código, lo que puede revelar problemas más rápidamente.

## Consideraciones

- **Dependencias entre Pruebas**: Si las pruebas tienen dependencias entre sí, ejecutarlas en paralelo puede no producir los resultados esperados. En tales casos, es mejor ejecutar las pruebas secuencialmente.
- **Recursos del Sistema**: La ejecución de pruebas en paralelo consume más recursos del sistema (CPU, memoria). Asegúrate de tener suficientes recursos para evitar problemas de rendimiento.

En resumen, `pytest` ofrece una opción poderosa para ejecutar pruebas en paralelo, lo que puede mejorar significativamente el rendimiento y la eficiencia de tus pruebas. Sin embargo, es importante considerar las dependencias entre pruebas y tener un buen manejo de los recursos del sistema.