import { renderHook, waitFor } from '@testing-library/react';
import { useCarModels } from './useCarModels';
import { describe, expect, beforeEach, vi } from 'vitest';

const mockCarModels = [
  {
    id: 1,
    name: "Mercedes-Benz",
    series: [{
      id: 1,
      name: "C klass",
      models: [
        { id: 1, name: "C 160" },
        { id: 2, name: "C 180" }
      ]
    }]
  }
];

describe('useCarModels', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should fetch and transform car models successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCarModels),
    });
    global.fetch = mockFetch;

    const { result } = renderHook(() => useCarModels());

    // initial values in the hook
    expect(result.current.isLoading).toBe(true);
    expect(result.current.options).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const expectedItems = [
      {
        id: 0,
        internalId: 1,
        value: "brand_1",
        label: "Mercedes-Benz",
        type: "brand",
        childIds: [
          "series_1_1"
        ],
        indentLevel: 0
      },
      {
        id: 1,
        internalId: 1,
        value: "series_1_1",
        label: "C klass",
        type: "series",
        parentId: "brand_1",
        childIds: [
          "model_1_1_1",
          "model_1_1_2"
        ],
        indentLevel: 1
      },
      {
        id: 2,
        internalId: 1,
        value: "model_1_1_1",
        label: "C 160",
        type: "model",
        parentId: "series_1_1",
        childIds: [],
        indentLevel: 2
      },
      {
        id: 3,
        internalId: 2,
        value: "model_1_1_2",
        label: "C 180",
        type: "model",
        parentId: "series_1_1",
        childIds: [],
        indentLevel: 2
      }
    ]

    expect(result.current.options).toEqual(expectedItems);
    expect(result.current.error).toBeNull();
  });

  test('should handle fetch error', async () => {
    // Mock the fetch call to reject
    const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
    global.fetch = mockFetch;

    const { result } = renderHook(() => useCarModels());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.options).toEqual([]);
  });

  test('should handle non-ok response', async () => {
    // non-ok response
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });
    global.fetch = mockFetch;

    const { result } = renderHook(() => useCarModels());

    // error state
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch car models');
    expect(result.current.options).toEqual([]);
  });
});