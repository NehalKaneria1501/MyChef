import { NextResponse } from 'next/server';
import { InquirySubmission } from '@/lib/types';
import { INITIAL_INQUIRIES } from '@/lib/mockData';

// Server-side in-memory cache for inquiries
let serverInquiries: InquirySubmission[] = [...INITIAL_INQUIRIES];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      inquiries: serverInquiries,
      total: serverInquiries.length,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      category,
      message,
      city,
      pincode,
      organizationName,
      estimatedMealsCount,
      dietaryPreference,
      startDate,
      subject,
      id,
    } = body;

    if (!fullName || !email || !phone || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: fullName, email, phone, and category are required.',
        },
        { status: 400 }
      );
    }

    const prefixMap: Record<string, string> = {
      corporate: 'INQ-CORP',
      student_mess: 'INQ-MESS',
      chef_partner: 'INQ-CHEF',
      event_catering: 'INQ-EVNT',
      customer_care: 'INQ-CARE',
      other: 'INQ-GEN',
    };
    const prefix = prefixMap[category] || 'INQ-REF';
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const inquiryId = id || `${prefix}-${Date.now().toString().slice(-4)}-${randomHex}`;

    const newInquiry: InquirySubmission = {
      id: inquiryId,
      category,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      city: city ? String(city).trim() : 'Ahmedabad / Gandhinagar',
      pincode: pincode ? String(pincode).trim() : undefined,
      organizationName: organizationName ? String(organizationName).trim() : undefined,
      estimatedMealsCount: estimatedMealsCount ? String(estimatedMealsCount).trim() : undefined,
      dietaryPreference: dietaryPreference || 'all',
      startDate: startDate ? String(startDate) : undefined,
      subject: subject ? String(subject).trim() : `New ${category} inquiry from ${fullName}`,
      message: message ? String(message).trim() : '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    serverInquiries.unshift(newInquiry);

    // Keep server memory capped at 100 entries to prevent memory leak
    if (serverInquiries.length > 100) {
      serverInquiries = serverInquiries.slice(0, 100);
    }

    console.log(`[MyChef Inquiry Received] ID: ${newInquiry.id} | Cat: ${newInquiry.category} | Name: ${newInquiry.fullName} | City: ${newInquiry.city}`);

    return NextResponse.json({
      success: true,
      inquiryId: newInquiry.id,
      inquiry: newInquiry,
      message: 'Your inquiry has been successfully received. Our operations team will contact you within 15 to 30 minutes.',
    });
  } catch (error) {
    console.error('Error handling inquiry submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing inquiry.' },
      { status: 500 }
    );
  }
}
