export function getContractsQuantityEndingIn30Days(): Promise<{ ammount: number }> {
  return fetch('/api/v1/contracts/ending-in-30-days/count').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getActiveContractsQuantity(): Promise<{ ammount: number }> {
  return fetch('/api/v1/contracts/active/count').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getContractsCreatedInLast12Months(): Promise<
  { month: string; year: string; count: number }[]
> {
  return fetch('/api/v1/contracts/created-in-last-12-months').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getContractsPaginated(
  page = 1,
  limit = 10
): Promise<{
  data: {
    id: number
    clientId: number
    startDate: string
    endDate: string
    status: string
    client: { fullName: string }
  }[]
}> {
  return fetch(`/api/v1/contracts?page=${page}&limit=${limit}`).then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}
