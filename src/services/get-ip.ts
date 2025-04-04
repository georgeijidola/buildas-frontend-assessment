export const getIpAddress = async (): Promise<string> => {
  const storedIpAddress = localStorage.getItem('ipAddress')

  if (storedIpAddress) {
    return storedIpAddress
  }

  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    const ipAddress = data.ip

    if (ipAddress) {
      localStorage.setItem('ipAddress', ipAddress)
      return ipAddress
    } else {
      throw new Error('Failed to retrieve IP address')
    }
  } catch (error) {
    console.error('Error getting IP address:', error)
    throw new Error('Failed to get IP address')
  }
}
