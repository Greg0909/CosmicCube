from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select

webPage = "https://beta.efectifactura.com.mx/"

ticketInfo = {
    "formaDePago": "Efectivo",
    "usoCFDI": "Gastos en general",
}

userInfo = {
    "rfc": "ABCDE",
    "razonSocial": "Empresa",
    "correo": "ventas@ensambles.mx",
}

usoCfdiOptions = {
    "Gastos en general": "Gastos en general",
}

formaDePagoOptions = {
    "Efectivo": "Efectivo",
    "Tarjeta de credito": u"Tarjeta de crédito"
}

def EGAS_Process(driver, ticketNumber, numeroDeEstacion, hora):

    ticketInfo["ticketNumber"] = ticketNumber
    ticketInfo["numeroDeEstacion"] = numeroDeEstacion
    ticketInfo["hora"] = hora
    # "ticketNumber":"00000000600316",
    # "numeroDeEstacion":"4109",
    # "hora":"11:49:59",

    driver.get(webPage)
    BusquedaDeTicketEGas(driver)
    LlenadoDeDatosDeUsuario(driver)


def writeToInputFieldById(elementId, data, driver):
    inputElement = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, elementId)))
    inputElement.send_keys( data )


def dropdownSelect(containerId, mapedOption, driver):
    
    dropdownContainer = driver.find_element_by_id( containerId )
    dropdownContainer.click()
    
    
    xPath = f"//ul/li/span[text()='{mapedOption}']"
    option = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, xPath)))
    option.click()


def BusquedaDeTicketEGas(driver):
    # Busca el input field del ticket number y le escribe
    writeToInputFieldById( "ticketNumber", ticketInfo["ticketNumber"], driver)

    # Busca el input field del numero de estacion y le escribe
    writeToInputFieldById( "stationNumber", ticketInfo["numeroDeEstacion"], driver)

    # Busca el input field de la hora y le escribe
    writeToInputFieldById( "time", ticketInfo["hora"], driver)

    xPathChatWindow = "//a[@name='searchTicket']"
    searchButton = WebDriverWait(driver,1).until( EC.presence_of_element_located((By.XPATH, xPathChatWindow)))
    searchButton.click()


def LlenadoDeDatosDeUsuario(driver):
    # Busca el input field del RFC y le escribe
    writeToInputFieldById( "rfc", userInfo["rfc"], driver)
    
    # Busca el input field de la razon social y le escribe
    writeToInputFieldById( "nombre", userInfo["razonSocial"], driver)
    
    # Busca el dropdown menu del CDFI y selecciona la opcion mas correcta
    dropdownSelect( "usoCfdiDiv", usoCfdiOptions[ ticketInfo["usoCFDI"] ], driver )
    
    # Busca el input field del correo electronico y le escribe
    writeToInputFieldById( "email", userInfo["correo"], driver)
    
    # Busca el dropdown menu de la forma de pago y selecciona la opcion mas correcta
    dropdownSelect( "divFormaPago", formaDePagoOptions[ ticketInfo["formaDePago"] ], driver )


def Enviar(driver):
    xPathChatWindow = "//a[text()='Facturar']"
    searchButton = WebDriverWait(driver,1).until( EC.presence_of_element_located((By.XPATH, xPathChatWindow)))
    searchButton.click()