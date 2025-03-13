'use client'
import { AISuggestion } from '@/actions'
import React from 'react'

export default function AIRecommendation() {
    return (
        <button
            onClick={() => AISuggestion()}
            className='btn btn-primary fixed bottom-5 right-5 z-10'>Recomended Menu</button>
    )
}

