'use client';

import React, { useEffect, useState } from 'react';
import { loadDefaultTransactions } from '@/lib/parser';
import { Loader2 } from 'lucide-react';

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/onboarding/step-1');
}