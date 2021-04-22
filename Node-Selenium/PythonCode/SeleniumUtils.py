from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select

def doChromeInit():
    option = Options()

    option.add_argument("--disable-infobars")
    option.add_argument("start-maximized")
    option.add_argument("--disable-extensions")

    # Pass the argument 1 to allow and 2 to block
    option.add_experimental_option("prefs", { 
        "profile.default_content_setting_values.notifications": 1 
    })

    PATH = "C:\Program Files (x86)\chromedriver.exe"
    driver = webdriver.Chrome(chrome_options=option, executable_path=PATH)
    
    return driver