import psutil
import platform
import time
import os

def mostrar_menu():
    print("\n--- DiagnostiGreen: Evaluacion de Rendimiento Sostenible ---")
    print("1. Analizar uso de CPU y RAM")
    print("2. Detectar software con alta carga al inicio")
    print("3. Verificar espacio disponible en disco")
    print("4. Ver diagnostico, recomendaciones y soluciones")
    print("5. Exportar informe de diagnostico")
    print("6. Salir")

def analizar_cpu_ram():
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    print(f"Uso de CPU: {cpu}%")
    print(f"Uso de RAM: {ram}%")
    return cpu, ram

def detectar_software_inicio():
    sospechosos = []
    try:
        if platform.system() == "Windows":
            import winreg
            rutas = [
                r"Software\\Microsoft\\Windows\\CurrentVersion\\Run",
                r"Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Run"
            ]
            for ruta in rutas:
                try:
                    reg = winreg.OpenKey(winreg.HKEY_CURRENT_USER, ruta)
                    i = 0
                    while True:
                        nombre, valor, _ = winreg.EnumValue(reg, i)
                        sospechosos.append(nombre)
                        i += 1
                except OSError:
                    pass
    except:
        print("Este proyecto actualmente solo funciona en Windows por ahora.")
    print("Programas configurados para iniciarse automáticamente:")
    for item in sospechosos:
        print(f"- {item}")
    return sospechosos

def verificar_espacio_disco():
    uso = psutil.disk_usage('/')
    libre = uso.free / (1024 ** 3)
    total = uso.total / (1024 ** 3)
    porcentaje = uso.percent
    print(f"Espacio disponible: {libre:.2f} GB de {total:.2f} GB ({porcentaje}% usado)")
    return libre, porcentaje

def diagnostico(cpu, ram, disco_libre, disco_porcentaje, programas):
    problemas = []
    soluciones = []

    if cpu > 80:
        problemas.append("Uso elevado de CPU.")
        soluciones.append("Cierre programas no utilizados. Presione Ctrl + Shift + Esc para abrir el Administrador de Tareas, seleccione procesos innecesarios y finalícelos.")
    if ram > 80:
        problemas.append("Uso elevado de RAM.")
        soluciones.append("Desinstale o cierre programas en segundo plano. También puede reiniciar la computadora para liberar memoria temporal.")
    if disco_porcentaje > 90:
        problemas.append("Espacio en disco muy bajo.")
        soluciones.append("Libere espacio eliminando archivos innecesarios o usando la herramienta 'Liberador de espacio en disco'. También puede mover archivos grandes a un pendrive o disco externo.")
    if len(programas) > 5:
        problemas.append("Muchos programas en el inicio del sistema.")
        soluciones.append("Desactive programas de inicio. Presione Ctrl + Shift + Esc, vaya a la pestaña 'Inicio' y desactive los que no necesita.")

    if not problemas:
        print("No se detectaron problemas graves. El Hardware parece estar funcionando bien.")
        decision = "No se justifica reemplazar la PC o computadora. Se le recomienda Optimizar el Software."
        soluciones.append("Mantenga su sistema actualizado y realice limpiezas periódicas para evitar acumulación de archivos basura y/o cache.")
    else:
        print("Problemas detectados:")
        for p in problemas:
            print(f"- {p}")
        decision = "La lentitud parece que se debe al Software. Se le recomienda limpieza y optimización."

    print("\nDiagnóstico final:")
    print(decision)

    print("\nSoluciones sugeridas:")
    for s in soluciones:
        print(f"- {s}")

    return problemas, decision, soluciones

def exportar_informe(cpu, ram, disco_libre, disco_porcentaje, programas, problemas, decision, soluciones):
    with open("informe_diagnostigreen.txt", "w") as archivo:
        archivo.write("Diagnóstico de Sistema - DiagnostiGreen\n\n")
        archivo.write(f"Uso de CPU: {cpu}%\n")
        archivo.write(f"Uso de RAM: {ram}%\n")
        archivo.write(f"Espacio libre en disco: {disco_libre:.2f} GB ({disco_porcentaje}% usado)\n")
        archivo.write("\nProgramas en el inicio:\n")
        for prog in programas:
            archivo.write(f"- {prog}\n")
        archivo.write("\nProblemas detectados:\n")
        if problemas:
            for p in problemas:
                archivo.write(f"- {p}\n")
        else:
            archivo.write("- No se detectaron problemas graves.\n")
        archivo.write(f"\nDiagnóstico final: {decision}\n")
        archivo.write("\nSoluciones sugeridas:\n")
        for s in soluciones:
            archivo.write(f"- {s}\n")
    print("\nInforme exportado como 'informe_diagnostigreen.txt'.")

def main():
    cpu = ram = disco_libre = disco_porcentaje = 0
    programas = []
    problemas = []
    decision = ""
    soluciones = []

    while True:
        mostrar_menu()
        opcion = input("\nSelecciona una opcion: ")

        if opcion == "1":
            cpu, ram = analizar_cpu_ram()
        elif opcion == "2":
            programas = detectar_software_inicio()
        elif opcion == "3":
            disco_libre, disco_porcentaje = verificar_espacio_disco()
        elif opcion == "4":
            problemas, decision, soluciones = diagnostico(cpu, ram, disco_libre, disco_porcentaje, programas)
        elif opcion == "5":
            exportar_informe(cpu, ram, disco_libre, disco_porcentaje, programas, problemas, decision, soluciones)
        elif opcion == "6":
            print("\nGracias por usar DiagnostiGreen ¡Cuida tu compu y nuestro planeta!")
            break
        else:
            print("\nOpción no válida. Intente nuevamente.")

if __name__ == "__main__":
    main()


