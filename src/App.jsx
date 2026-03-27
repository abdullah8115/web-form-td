import React, { useState, useEffect } from 'react';

export default function PreOfferForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flexibility, setFlexibility] = useState('');
  
  // State for auto-calculating Gross Salary
  const [comp, setComp] = useState({
    basic: '', hra: '', conveyance: '', medical: '', other: '', gross: ''
  });

  useEffect(() => {
    const total = ['basic', 'hra', 'conveyance', 'medical', 'other'].reduce((sum, key) => {
      return sum + (parseFloat(comp[key]) || 0);
    }, 0);
    if (total > 0) {
      setComp(prev => ({ ...prev, gross: total }));
    } else {
      setComp(prev => ({ ...prev, gross: '' }));
    }
  }, [comp.basic, comp.hra, comp.conveyance, comp.medical, comp.other]);

  const handleCompChange = (e) => {
    setComp({ ...comp, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPDF = () => {
    // Triggers the browser's native, flawless PDF engine
    window.print();
  };

  const handleShareWhatsApp = () => {
    // Opens WhatsApp Web or App
    const message = "Hey, attached is my completed Candidate Information Form.";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans relative pb-16">
      
      {/* SUCCESS SCREEN OVERLAY - Hidden during print! */}
      {isSubmitted && (
        <div className="no-print fixed inset-0 z-50 bg-stone-50/95 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 max-w-lg w-full text-center shadow-xl my-auto">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✅</div>
            <h2 className="font-serif text-2xl text-slate-900 font-semibold mb-3">Form Completed!</h2>
            
            <div className="text-gray-500 text-sm mb-8 leading-relaxed text-left bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="font-semibold text-slate-700 mb-2">Next Steps:</p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Click <strong>Save as PDF</strong> (Ensure destination is set to "Save as PDF" in the dialog).</li>
                <li>Click <strong>Open WhatsApp</strong>.</li>
                <li>Attach your saved PDF to the chat!</li>
              </ol>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDownloadPDF} 
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Step 1: Save as PDF
              </button>
              
              <button 
                onClick={handleShareWhatsApp} 
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-6 rounded-xl font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Step 2: Open WhatsApp
              </button>
            </div>
            
            <button onClick={() => setIsSubmitted(false)} className="mt-6 text-sm text-gray-400 hover:text-slate-900 transition-colors">
              ← Back to edit form
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="print-header bg-slate-900 pt-10 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 pb-8">
          <span className="inline-block bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-4 no-print">
            Confidential · Pre-Offer
          </span>
          <h1 className="font-serif text-3xl text-white font-semibold leading-tight mb-2">
            Candidate Compensation &amp;<br />Benefits Disclosure
          </h1>
          <p className="text-white/60 text-sm font-light max-w-xl leading-relaxed">
            Please complete this form accurately. Your information will be kept strictly confidential and used solely for offer evaluation purposes.
          </p>
        </div>
        <div className="max-w-3xl mx-auto relative translate-y-[1px] no-print">
          <div className="bg-stone-50 h-6 rounded-t-3xl w-full"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-6">
        
        {/* NOTICE */}
        <div className="no-print bg-amber-50/50 border border-amber-400 rounded-xl p-4 flex gap-3 text-amber-900 text-sm mb-6 shadow-sm">
          <span className="text-lg">ℹ️</span>
          <p>
            All information provided in this form is strictly confidential. It will only be reviewed by the HR team. Fields marked <strong className="text-amber-600">★</strong> are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: CANDIDATE INFO */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="no-print w-10 h-10 bg-slate-900 text-amber-500 rounded-xl flex items-center justify-center text-xl shrink-0">👤</div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-900">Candidate Information</h2>
                <p className="text-xs text-gray-500 mt-0.5">Basic details for identification</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Full Name <span className="text-amber-500 no-print">★</span></label>
                <input type="text" name="full_name" required placeholder="As per CNIC / Passport" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Position Applied For <span className="text-amber-500 no-print">★</span></label>
                <input type="text" name="position" required placeholder="e.g. Manager HR" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Department</label>
                <input type="text" name="department" placeholder="e.g. Human Resources" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Interview Date</label>
                <input type="date" name="interview_date" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Contact Number <span className="text-amber-500 no-print">★</span></label>
                <input type="tel" name="phone" required placeholder="+92 300 0000000" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Email Address <span className="text-amber-500 no-print">★</span></label>
                <input type="email" name="email" required placeholder="you@example.com" className="form-input" />
              </div>
            </div>
          </section>

          {/* SECTION 2: CURRENT EMPLOYMENT */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="no-print w-10 h-10 bg-slate-900 text-amber-500 rounded-xl flex items-center justify-center text-xl shrink-0">🏢</div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-900">Current / Last Employment</h2>
                <p className="text-xs text-gray-500 mt-0.5">Details of your present or most recent employer</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Current / Last Employer</label>
                <input type="text" name="employer" placeholder="Company name" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Current Designation</label>
                <input type="text" name="designation" placeholder="e.g. Senior Executive HR" className="form-input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Employment Status</label>
                <select name="emp_status" className="form-input bg-white">
                  <option value="">— Select —</option>
                  <option>Currently Employed</option>
                  <option>Resigned (serving notice)</option>
                  <option>Currently Unemployed</option>
                  <option>Freelance / Contractual</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Notice Period Required</label>
                <select name="notice_period" className="form-input bg-white">
                  <option value="">— Select —</option>
                  <option>Immediate / No Notice</option>
                  <option>1 Week</option>
                  <option>2 Weeks</option>
                  <option>1 Month</option>
                  <option>2 Months</option>
                  <option>3 Months</option>
                  <option>More than 3 Months</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Available to Join From</label>
                <input type="date" name="joining_date" className="form-input" />
              </div>
            </div>
          </section>

          {/* SECTION 3: CURRENT COMPENSATION */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="no-print w-10 h-10 bg-slate-900 text-amber-500 rounded-xl flex items-center justify-center text-xl shrink-0">💰</div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-900">Current Compensation Package</h2>
                <p className="text-xs text-gray-500 mt-0.5">Monthly figures in PKR unless stated otherwise</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Basic Salary <span className="text-amber-500 no-print">★</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="basic" value={comp.basic} onChange={handleCompChange} required min="0" placeholder="0" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">House Rent Allowance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="hra" value={comp.hra} onChange={handleCompChange} min="0" placeholder="0" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Conveyance / Transport</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="conveyance" value={comp.conveyance} onChange={handleCompChange} min="0" placeholder="0" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Medical Allowance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="medical" value={comp.medical} onChange={handleCompChange} min="0" placeholder="0" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Other Allowances</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="other" value={comp.other} onChange={handleCompChange} min="0" placeholder="0" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Gross Monthly Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" value={comp.gross} readOnly placeholder="Auto-calculated" className="form-input pl-8 bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
              </div>
            </div>
            
            <hr className="my-6 border-gray-100" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Annual Bonus (last received)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="curr_bonus" min="0" placeholder="0" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Increment Due / Expected</label>
                <select name="increment_due" className="form-input bg-white">
                  <option value="">— Select —</option>
                  <option>No increment due</option>
                  <option>Due within 1 month</option>
                  <option>Due within 3 months</option>
                  <option>Due within 6 months</option>
                  <option>Already received this year</option>
                </select>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="flex flex-col gap-3 mb-5">
               <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Current Benefits (select all that apply)</label>
               <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {['Provident Fund (EOBI/PF)', 'Gratuity', 'Health / Medical Insurance', 'Life Insurance', 'Company Vehicle / Fuel', 'Mobile Phone / Sim', 'Lunch / Meal Subsidy', 'Pick & Drop Transport', 'Staff Loan Facility', 'Paid Annual Leaves >14'].map(benefit => (
                    <label key={benefit} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" name={`cb_${benefit.split(' ')[0]}`} className="w-4 h-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900" />
                      {benefit}
                    </label>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Other Current Benefits</label>
              <input type="text" name="cb_other" placeholder="e.g. Housing scheme, Children's education allowance…" className="form-input" />
            </div>
          </section>

          {/* SECTION 4: EXPECTED PACKAGE */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="no-print w-10 h-10 bg-slate-900 text-amber-500 rounded-xl flex items-center justify-center text-xl shrink-0">🎯</div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-900">Expected Compensation &amp; Benefits</h2>
                <p className="text-xs text-gray-500 mt-0.5">What you are seeking from our organization</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
               <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Expected Gross Salary <span className="text-amber-500 no-print">★</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="exp_gross" required min="0" placeholder="Monthly gross" className="form-input pl-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Minimum Acceptable Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="exp_min" min="0" placeholder="Floor figure" className="form-input pl-8" />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="flex flex-col gap-3 mb-5">
               <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Expected Benefits &amp; Perks</label>
               <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {['Provident Fund / EOBI', 'Gratuity', 'Health / Medical Insurance', 'Life Insurance', 'Company Vehicle / Fuel', 'Mobile Phone / Sim', 'Lunch / Meal Subsidy', 'Pick & Drop Transport', 'Staff Loan Facility', 'Housing Allowance', 'Children\'s Education', 'Annual Increment'].map(benefit => (
                    <label key={benefit} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" name={`eb_${benefit.split(' ')[0]}`} className="w-4 h-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900" />
                      {benefit}
                    </label>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Other Expected Benefits</label>
              <input type="text" name="eb_other" placeholder="Any specific perks you require…" className="form-input" />
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="flex flex-col gap-3">
               <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Flexibility on Salary Negotiation</label>
               <div className="flex flex-wrap gap-2">
                 {['Open to negotiation', 'Fixed expectation', 'Flexible for right role'].map(val => (
                   <button
                     key={val}
                     type="button"
                     onClick={() => setFlexibility(val)}
                     className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                       flexibility === val 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white border-gray-300 text-gray-600 hover:border-slate-900 hover:text-slate-900'
                     }`}
                   >
                     {val}
                   </button>
                 ))}
                 <input type="hidden" name="negotiation_flex" value={flexibility} />
               </div>
            </div>
          </section>

          {/* SECTION 5: ADDITIONAL */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="no-print w-10 h-10 bg-slate-900 text-amber-500 rounded-xl flex items-center justify-center text-xl shrink-0">📋</div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-900">Additional Information</h2>
                <p className="text-xs text-gray-500 mt-0.5">Any other details relevant to your offer</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Any Competing Offer?</label>
                <select name="competing_offer" className="form-input bg-white">
                  <option value="">— Select —</option>
                  <option>No other offers</option>
                  <option>Yes – one other offer</option>
                  <option>Yes – multiple offers</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Competing Offer Value (if any)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium no-print">₨</span>
                  <input type="number" name="competing_value" min="0" placeholder="Monthly gross" className="form-input pl-8" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Reason for Leaving Current / Last Role</label>
                <textarea name="leaving_reason" placeholder="Brief explanation…" className="form-input min-h-[80px] resize-y"></textarea>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Special Requirements or Conditions</label>
                <textarea name="special_req" placeholder="e.g. Specific working hours, remote work days, relocation support…" className="form-input min-h-[80px] resize-y"></textarea>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Additional Comments for HR</label>
                <textarea name="comments" placeholder="Anything else you'd like us to consider…" className="form-input min-h-[80px] resize-y"></textarea>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Candidate Declaration <span className="text-amber-500 no-print">★</span></label>
              <label className="flex items-start gap-3 mt-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" name="declaration" required className="mt-1 w-4 h-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900 shrink-0" />
                I declare that all information provided in this form is true and accurate to the best of my knowledge. I understand that any misrepresentation may result in disqualification from the selection process or termination if discovered post-joining.
              </label>
            </div>
          </section>

          {/* SUBMIT AREA */}
          <div className="no-print bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
            <p className="text-xs text-gray-500 max-w-sm">
              Your form will be reviewed confidentially by the HR team. You may be contacted to discuss your expectations before a formal offer is extended.
            </p>
            <button type="submit" className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0">
              Submit Form
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}