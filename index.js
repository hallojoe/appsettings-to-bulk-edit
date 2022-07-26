const AzureConfigurationEmpty = ''
const AzureConfigurationSeparator = "__"
const AzureConfigurationSchemaPropertyName = "$schema"

function toKeyValuePairs(appSettings, previousKey) {

  if(!previousKey) previousKey = AzureConfigurationEmpty

  const flatAppSettings = Object.keys(appSettings).reduce((accumulator, currentKey) => {    

    const key = previousKey + currentKey  

    if(key === AzureConfigurationSchemaPropertyName) return accumulator
    
    const currentValue = appSettings[currentKey]

    if (Array.isArray(currentValue) || Object(currentValue) === currentValue) 
      Object.assign(accumulator, toKeyValuePairs(currentValue, key + AzureConfigurationSeparator))
    else accumulator[key] = currentValue

    return accumulator

  }, {})

  return flatAppSettings

}

function toAzureConfigurationValues(appSettings) {

  const flatAppSettings = toKeyValuePairs(appSettings)
  
  const mappedFlatAppSettings = Object.keys(flatAppSettings).map(flatAppSettingKey => {

    return {
      name: flatAppSettingKey, 
      value: flatAppSettings[flatAppSettingKey].toString(), 
      slotSetting: false 
    }

  })

  return mappedFlatAppSettings

}
