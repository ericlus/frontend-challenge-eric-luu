import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLoanData } from './useLoanData'
import { aggregateLoanData } from '../utils/aggregateLoans'
import { getData } from '../request/api'

// Mock dependencies
vi.mock('../utils/aggregateLoans')
vi.mock('../request/api', () => ({
  getData: vi.fn(() => Promise.resolve([])),
}))

describe('useLoanData', () => {
  const mockLoanData = [
    { year: '2021', quarter: '1', homeOwnership: 'MORTGAGE', term: '36 months', grade: 'A', currentBalance: '1000' },
    { year: '2021', quarter: '2', homeOwnership: 'OWN', term: '36 months', grade: 'B', currentBalance: '2000' },
    { year: '2022', quarter: '1', homeOwnership: 'RENT', term: '60 months', grade: 'A', currentBalance: '3000' },
    { year: '2022', quarter: '2', homeOwnership: 'MORTGAGE', term: '60 months', grade: 'B', currentBalance: '4000' },
  ]

  beforeEach(() => {
    // Reset all mocks
    vi.mocked(getData).mockReset()
    vi.mocked(aggregateLoanData).mockReset()
    
    // Setup default mocks
    vi.mocked(aggregateLoanData).mockReturnValue([
      { grade: 'A', totalBalance: 4000 },
      { grade: 'B', totalBalance: 6000 },
    ])
  })

  it('should fetch data on mount', async () => {
    // Mock API response
    vi.mocked(getData).mockResolvedValueOnce(mockLoanData)

    const { result } = renderHook(() => useLoanData())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(mockLoanData)
    })
  })

  it('should apply filters correctly', async () => {
    vi.mocked(getData).mockResolvedValueOnce(mockLoanData)
    const { result } = renderHook(() => useLoanData())

    // Wait for initial load
    await waitFor(() => expect(result.current.loading).toBe(false))

    // Apply filters
    act(() => {
      result.current.applyFilters({ year: '2021' })
    })

    await waitFor(() => {
      expect(result.current.currentFilters.year).toBe('2021')
      expect(result.current.filteredData).toHaveLength(2)
      expect(result.current.filteredData[0].year).toBe('2021')
    })
  })

  it('should reset filters correctly', async () => {
    vi.mocked(getData).mockResolvedValueOnce(mockLoanData)
    const { result } = renderHook(() => useLoanData())

    // Wait for initial load
    await waitFor(() => expect(result.current.loading).toBe(false))

    // Apply and reset filters
    act(() => result.current.applyFilters({ year: '2021' }))
    act(() => result.current.resetFilters())

    await waitFor(() => {
      expect(result.current.currentFilters).toEqual({})
      expect(result.current.filteredData).toEqual(mockLoanData)
    })
  })

  it('should aggregate data by grade correctly', async () => {
    vi.mocked(getData).mockResolvedValueOnce(mockLoanData)
    const { result } = renderHook(() => useLoanData())

    await waitFor(() => {
      expect(result.current.aggregatedData).toEqual([
        { grade: 'A', totalBalance: 4000 },
        { grade: 'B', totalBalance: 6000 },
      ])
    })
  })

  it('should handle errors correctly', async () => {
    const mockError = new Error('Network error')
    vi.mocked(getData).mockRejectedValueOnce(mockError)

    const { result } = renderHook(() => useLoanData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual(mockError)
    })
  })
})