'use client';

import React from 'react';
import OrderTrackingPage from '../page';

export default function OrderTrackingWithIdPage({ params }: { params: Promise<{ id: string }> }) {
  return <OrderTrackingPage />;
}
