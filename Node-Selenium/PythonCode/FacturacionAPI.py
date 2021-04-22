import EGAS
import SeleniumUtils
import sys
import getopt
import time
import re

try:
    opts, args = getopt.getopt(sys.argv[1:],"hf:t:e:d:",[])
except getopt.GetoptError:
    print ('FacturacionAPI.py -f <facturador> -t <ticket number> -e <numero de estacion> -d <hora/date>')
    sys.exit(2)

facturador = ""
ticketNumber = ""
numeroDeEstacion = ""
hora = ""


for opt, arg in opts:
    if opt == '-h':
        print ('FacturacionAPI.py -f <facturador> -t <ticket number> -e <numero de estacion> -d <hora/date>')
        sys.exit()
    elif opt in ("-f"):
        facturador = arg
    elif opt in ("-t"):
        ticketNumber = arg
    elif opt in ("-e",):
        numeroDeEstacion = arg
    elif opt in ("-d",):
        hora = arg

driver = SeleniumUtils.doChromeInit()
print("Facturador: " + facturador)

if facturador == "EGAS":

    if ticketNumber!="" and numeroDeEstacion!="" and hora!="":
        EGAS.EGAS_Process(driver, ticketNumber, numeroDeEstacion, hora)
    else:
        print("Error EGAS los datos no estan completos")


else:
    print("Error No existe el facturador")

print("Oliwis")
print("despues de un rato.")
time.sleep(10)
driver.close()






