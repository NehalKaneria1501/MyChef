export interface CityHub {
  name: string;
  state: string;
  type: 'student_hub' | 'corporate_hub' | 'metro' | 'regional_center';
  popularAreas: string[];
  defaultPincode: string;
}

export const CITIES_AND_HUBS: CityHub[] = [
  // GUJARAT
  { name: 'Ahmedabad', state: 'Gujarat', type: 'metro', popularAreas: ['Navrangpura', 'Satellite', 'Bopal', 'SG Highway', 'Maninagar', 'Vastrapur'], defaultPincode: '380015' },
  { name: 'Gandhinagar', state: 'Gujarat', type: 'student_hub', popularAreas: ['Infocity', 'Sector 6', 'Sector 21', 'PDPU Campus', 'DAIICT Hub'], defaultPincode: '382007' },
  { name: 'Infocity (Gandhinagar)', state: 'Gujarat', type: 'corporate_hub', popularAreas: ['Infocity IT Tower', 'Sector 0', 'Kudasan', 'Randesan'], defaultPincode: '382009' },
  { name: 'GIFT City', state: 'Gujarat', type: 'corporate_hub', popularAreas: ['GIFT Tower One', 'Fintech Hub', 'GIFT SEZ Zone', 'Preksha Vishva'], defaultPincode: '382355' },
  { name: 'Rajkot', state: 'Gujarat', type: 'regional_center', popularAreas: ['Kalawad Road', 'Yagnik Road', 'University Road', '150ft Ring Road', 'Kothariya'], defaultPincode: '360005' },
  { name: 'Surat', state: 'Gujarat', type: 'metro', popularAreas: ['Vesu', 'Adajan', 'Piplod', 'Varachha', 'Katargam', 'Ghod Dod Road'], defaultPincode: '395007' },
  { name: 'Vadodara', state: 'Gujarat', type: 'student_hub', popularAreas: ['Alkapuri', 'Fatehgunj (MSU Campus)', 'Manjalpur', 'Gotri', 'Sayajigunj'], defaultPincode: '390002' },
  { name: 'Bhavnagar', state: 'Gujarat', type: 'regional_center', popularAreas: ['Waghawadi Road', 'Kaliabid', 'Ghogha Circle', 'Sardarnagar'], defaultPincode: '364001' },
  { name: 'Jamnagar', state: 'Gujarat', type: 'regional_center', popularAreas: ['Park Colony', 'Digjam Circle', 'Patel Colony', 'Reliance Greens'], defaultPincode: '361008' },
  { name: 'Anand', state: 'Gujarat', type: 'student_hub', popularAreas: ['Amul Dairy Road', 'Ganesh Chokdi', 'Borsad Chokdi', 'Nana Bazar'], defaultPincode: '388001' },
  { name: 'Vallabh Vidyanagar', state: 'Gujarat', type: 'student_hub', popularAreas: ['BVM Campus', 'SP University Circle', 'Shastri Maidan', 'Mota Bazar'], defaultPincode: '388120' },
  { name: 'Nadiad', state: 'Gujarat', type: 'student_hub', popularAreas: ['DDU College Area', 'College Road', 'Santram Mandir Road'], defaultPincode: '387001' },
  { name: 'Bharuch', state: 'Gujarat', type: 'regional_center', popularAreas: ['Zadeshwar Road', 'Link Road', 'GNFC Township'], defaultPincode: '392001' },
  { name: 'Ankleshwar', state: 'Gujarat', type: 'corporate_hub', popularAreas: ['GIDC Estate', 'Station Road', 'Valia Road'], defaultPincode: '393002' },
  { name: 'Navsari & Bilimora', state: 'Gujarat', type: 'regional_center', popularAreas: ['Somnath Road', 'Lunsikui', 'Station Area'], defaultPincode: '396321' },
  { name: 'Valsad', state: 'Gujarat', type: 'regional_center', popularAreas: ['Tithal Road', 'Dharampur Road', 'Kapadia Chal'], defaultPincode: '396001' },
  { name: 'Vapi', state: 'Gujarat', type: 'corporate_hub', popularAreas: ['GIDC Industrial Zone', 'Gunjan', 'Chala', 'Silvassa Road'], defaultPincode: '396195' },
  { name: 'Gandhidham & Mundra', state: 'Gujarat', type: 'corporate_hub', popularAreas: ['Adani Port Road', 'Sector 1-9', 'Tagore Road'], defaultPincode: '370201' },

  // MAHARASHTRA
  { name: 'Mumbai', state: 'Maharashtra', type: 'metro', popularAreas: ['Andheri West', 'Bandra Kurla Complex (BKC)', 'Powai (IIT Hub)', 'Lower Parel', 'Dadar', 'Borivali'], defaultPincode: '400076' },
  { name: 'Pune', state: 'Maharashtra', type: 'student_hub', popularAreas: ['Hinjewadi IT Park', 'Kothrud (Student Area)', 'Viman Nagar', 'Baner', 'Wakad', 'FC Road'], defaultPincode: '411057' },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra', type: 'corporate_hub', popularAreas: ['Nigdi', 'Bhosari', 'Pimple Saudagar', 'Ravet Campus'], defaultPincode: '411044' },
  { name: 'Thane & Palghar', state: 'Maharashtra', type: 'metro', popularAreas: ['Majiwada', 'Ghodbunder Road', 'Hiranandani Estate', 'Vasai-Virar'], defaultPincode: '400607' },
  { name: 'Nashik', state: 'Maharashtra', type: 'regional_center', popularAreas: ['College Road', 'Gangapur Road', 'Indira Nagar'], defaultPincode: '422005' },
  { name: 'Nagpur', state: 'Maharashtra', type: 'student_hub', popularAreas: ['Dharampeth', 'VNIT Campus', 'Ramdaspeth', 'Sitabuldi'], defaultPincode: '440010' },
  { name: 'Amravati (Maharashtra)', state: 'Maharashtra', type: 'student_hub', popularAreas: ['Camp Area', 'Rathi Nagar', 'Gadge Nagar'], defaultPincode: '444602' },

  // RAJASTHAN
  { name: 'Kota', state: 'Rajasthan', type: 'student_hub', popularAreas: ['Vigyan Nagar (Coaching Hub)', 'Talwandi', 'Mahaveer Nagar', 'Indraprastha Area'], defaultPincode: '324005' },
  { name: 'Jaipur', state: 'Rajasthan', type: 'metro', popularAreas: ['Malviya Nagar (MNIT Hub)', 'Vaishali Nagar', 'Mansarovar', 'C-Scheme', 'Raja Park'], defaultPincode: '302017' },
  { name: 'Jodhpur', state: 'Rajasthan', type: 'student_hub', popularAreas: ['IIT Jodhpur Road', 'Shastri Nagar', 'Ratanada', 'Sardarpura'], defaultPincode: '342003' },
  { name: 'Udaipur', state: 'Rajasthan', type: 'regional_center', popularAreas: ['Fatehpura', 'Hiran Magri', 'Sukhadia Circle', 'Bhopalpura'], defaultPincode: '313001' },
  { name: 'Pilani', state: 'Rajasthan', type: 'student_hub', popularAreas: ['BITS Pilani Campus Area', 'Vidya Vihar', 'Nutankunj', 'Station Road'], defaultPincode: '333031' },

  // DELHI NCR & NORTH
  { name: 'Delhi & New Delhi', state: 'Delhi NCR', type: 'metro', popularAreas: ['North Campus (DU Hub)', 'South Campus (Satya Niketan)', 'Connaught Place', 'Laxmi Nagar', 'Hauz Khas'], defaultPincode: '110007' },
  { name: 'Gurugram', state: 'Delhi NCR', type: 'corporate_hub', popularAreas: ['Cyber City', 'Golf Course Road', 'Sector 29', 'Sohna Road', 'DLF Phase 1-5'], defaultPincode: '122002' },
  { name: 'Noida', state: 'Delhi NCR', type: 'corporate_hub', popularAreas: ['Sector 62 (Tech Hub)', 'Sector 18', 'Sector 137', 'Knowledge Park (Greater Noida)'], defaultPincode: '201301' },
  { name: 'Chandigarh', state: 'Punjab/Haryana', type: 'student_hub', popularAreas: ['Sector 17', 'Sector 35', 'Panjab University Hub', 'Mohali Phase 7'], defaultPincode: '160014' },
  { name: 'Kanpur', state: 'Uttar Pradesh', type: 'student_hub', popularAreas: ['IIT Kanpur Kalyanpur', 'Kakadeo (Student Hub)', 'Swaroop Nagar', 'Civil Lines'], defaultPincode: '208016' },
  { name: 'Lucknow', state: 'Uttar Pradesh', type: 'metro', popularAreas: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'IIM Road'], defaultPincode: '226010' },
  { name: 'Roorkee', state: 'Uttarakhand', type: 'student_hub', popularAreas: ['IIT Roorkee Civil Lines', 'Malviya Chowk', 'Ganeshpur'], defaultPincode: '247667' },

  // EAST & CENTRAL
  { name: 'Kolkata', state: 'West Bengal', type: 'metro', popularAreas: ['Salt Lake Sector V (Tech Hub)', 'New Town', 'Park Street', 'Jadavpur University Hub', 'Gariahat'], defaultPincode: '700091' },
  { name: 'Kharagpur', state: 'West Bengal', type: 'student_hub', popularAreas: ['IIT Kharagpur Campus', 'Prembazar', 'Tech Market', 'Puri Gate'], defaultPincode: '721302' },
  { name: 'Patna', state: 'Bihar', type: 'student_hub', popularAreas: ['Boring Road (Student Area)', 'Kankarbagh', 'Bailey Road', 'Patliputra'], defaultPincode: '800001' },
  { name: 'Ranchi', state: 'Jharkhand', type: 'student_hub', popularAreas: ['BIT Mesra Area', 'Lalpur', 'Doranda', 'Kanke Road'], defaultPincode: '834001' },
  { name: 'Bhubaneswar', state: 'Odisha', type: 'student_hub', popularAreas: ['KIIT Road / Patia', 'Infocity Chandrasekharpur', 'Saheed Nagar'], defaultPincode: '751024' },
  { name: 'Raipur', state: 'Chhattisgarh', type: 'regional_center', popularAreas: ['Telibandha', 'Pandri', 'NIT Raipur GE Road', 'Shankar Nagar'], defaultPincode: '492001' },
  { name: 'Indore', state: 'Madhya Pradesh', type: 'student_hub', popularAreas: ['Vijay Nagar', 'Bhawarkua (Student Hub)', 'Palasia', 'Super Corridor'], defaultPincode: '452010' },
  { name: 'Bhopal', state: 'Madhya Pradesh', type: 'student_hub', popularAreas: ['MP Nagar', 'Arera Colony', 'MANIT Campus Hub', 'Hoshangabad Road'], defaultPincode: '462011' },
  { name: 'Jabalpur & Ratlam', state: 'Madhya Pradesh', type: 'regional_center', popularAreas: ['Civil Lines', 'Wright Town', 'Station Road'], defaultPincode: '482001' },

  // SOUTH
  { name: 'Bengaluru', state: 'Karnataka', type: 'metro', popularAreas: ['Bellandur / Ecoworld', 'Koramangala', 'HSR Layout', 'Whitefield', 'Indiranagar', 'Electronic City'], defaultPincode: '560103' },
  { name: 'Mangaluru & Mysuru', state: 'Karnataka', type: 'student_hub', popularAreas: ['Kankanady', 'Hampankatta', 'Gokulam (Mysuru)', 'Jayalakshmipuram'], defaultPincode: '575001' },
  { name: 'Hyderabad & Secunderabad', state: 'Telangana', type: 'metro', popularAreas: ['HITEC City', 'Gachibowli', 'Madhapur', 'Ameerpet (Student Hub)', 'Kondapur', 'Banjara Hills'], defaultPincode: '500081' },
  { name: 'Amaravati (Andhra Pradesh)', state: 'Andhra Pradesh', type: 'student_hub', popularAreas: ['SRM University Campus Area', 'VIT-AP Area', 'Mangalagiri', 'Vijayawada Hub'], defaultPincode: '522502' },
  { name: 'Chennai (Madras)', state: 'Tamil Nadu', type: 'metro', popularAreas: ['OMR IT Corridor', 'Anna Nagar', 'Velachery', 'T. Nagar', 'IIT Madras Adyar'], defaultPincode: '600096' },
  { name: 'Kochi & Thiruvananthapuram', state: 'Kerala', type: 'metro', popularAreas: ['Infopark Kakkanad', 'Technopark Kazhakkoottam', 'Edapally', 'Panampilly Nagar'], defaultPincode: '682030' },
];
