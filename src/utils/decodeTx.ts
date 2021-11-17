import axios from 'axios'

import { DecodedData } from 'src/types/transactions/decode.d'

export const fetchTxDecoder = async (txData: string, txServiceUrl: string): Promise<DecodedData | null> => {
  if (!txData?.length || txData === '0x') {
    return null
  }

  const url = `${txServiceUrl}/data-decoder/`
  try {
    const res = await axios.post<DecodedData>(url, { data: txData })
    return res.data
  } catch (error) {
    return null
  }
}
