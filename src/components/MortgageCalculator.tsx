import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, Shield, Home, PieChart } from 'lucide-react';
import { MortgageCalcInputs, MortgageCalcResults } from '../types';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialPrice = 1200000 }) => {
  const [inputs, setInputs] = useState<MortgageCalcInputs>({
    homePrice: initialPrice,
    downPaymentPercent: 20,
    interestRate: 6.5,
    loanTermYears: 30,
    propertyTaxRate: 1.2,
    homeInsuranceAnnual: 1800,
    hoaFeeMonthly: 250,
  });

  const results: MortgageCalcResults = useMemo(() => {
    const downPaymentAmount = (inputs.homePrice * inputs.downPaymentPercent) / 100;
    const totalLoanAmount = inputs.homePrice - downPaymentAmount;

    const monthlyInterestRate = inputs.interestRate / 100 / 12;
    const totalMonths = inputs.loanTermYears * 12;

    let principalAndInterest = 0;
    if (monthlyInterestRate > 0) {
      principalAndInterest =
        (totalLoanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    } else {
      principalAndInterest = totalLoanAmount / totalMonths;
    }

    const monthlyPropertyTax = (inputs.homePrice * (inputs.propertyTaxRate / 100)) / 12;
    const monthlyInsurance = inputs.homeInsuranceAnnual / 12;
    const monthlyHoa = inputs.hoaFeeMonthly;

    const totalMonthlyPayment =
      principalAndInterest + monthlyPropertyTax + monthlyInsurance + monthlyHoa;

    const totalInterestPaid = principalAndInterest * totalMonths - totalLoanAmount;

    return {
      principalAndInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyHoa,
      totalMonthlyPayment,
      totalLoanAmount,
      totalInterestPaid,
      downPaymentAmount,
    };
  }, [inputs]);

  const formattedCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  // Percentages for visual progress bars
  const pAndIPct = Math.round((results.principalAndInterest / results.totalMonthlyPayment) * 100) || 0;
  const taxPct = Math.round((results.monthlyPropertyTax / results.totalMonthlyPayment) * 100) || 0;
  const insPct = Math.round((results.monthlyInsurance / results.totalMonthlyPayment) * 100) || 0;
  const hoaPct = Math.round((results.monthlyHoa / results.totalMonthlyPayment) * 100) || 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-8 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Financial Tool</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Mortgage EMI Calculator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Estimate your monthly principal, interest, taxes, insurance, and down payment.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-center shrink-0">
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 block">
            Estimated Monthly Payment
          </span>
          <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
            {formattedCurrency(results.totalMonthlyPayment)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">/month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Home Price Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-900 dark:text-white">
              <label className="flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-500" /> Home Purchase Price
              </label>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-base">
                {formattedCurrency(inputs.homePrice)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={10000000}
              step={25000}
              value={inputs.homePrice}
              onChange={e => setInputs(prev => ({ ...prev, homePrice: Number(e.target.value) }))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Down Payment % Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-900 dark:text-white">
              <label className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-blue-500" /> Down Payment ({inputs.downPaymentPercent}%)
              </label>
              <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                {formattedCurrency(results.downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={inputs.downPaymentPercent}
              onChange={e => setInputs(prev => ({ ...prev, downPaymentPercent: Number(e.target.value) }))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-blue-500" /> Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="20"
                value={inputs.interestRate}
                onChange={e => setInputs(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" /> Loan Duration
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {[15, 20, 30].map(yr => (
                  <button
                    key={yr}
                    onClick={() => setInputs(prev => ({ ...prev, loanTermYears: yr }))}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      inputs.loanTermYears === yr
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Taxes & Insurance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Property Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.propertyTaxRate}
                onChange={e => setInputs(prev => ({ ...prev, propertyTaxRate: Number(e.target.value) }))}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Home Insurance ($/yr)
              </label>
              <input
                type="number"
                step="100"
                value={inputs.homeInsuranceAnnual}
                onChange={e => setInputs(prev => ({ ...prev, homeInsuranceAnnual: Number(e.target.value) }))}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                HOA Fees ($/mo)
              </label>
              <input
                type="number"
                step="25"
                value={inputs.hoaFeeMonthly}
                onChange={e => setInputs(prev => ({ ...prev, hoaFeeMonthly: Number(e.target.value) }))}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Visual Payment Breakdown Column */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-500" /> Payment Breakdown
          </h3>

          {/* Multi-segmented Progress Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex">
              <div style={{ width: `${pAndIPct}%` }} className="bg-blue-600 h-full" title="Principal & Interest" />
              <div style={{ width: `${taxPct}%` }} className="bg-indigo-500 h-full" title="Property Tax" />
              <div style={{ width: `${insPct}%` }} className="bg-emerald-500 h-full" title="Insurance" />
              <div style={{ width: `${hoaPct}%` }} className="bg-amber-500 h-full" title="HOA Fees" />
            </div>
          </div>

          {/* Items breakdown list */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Principal & Interest</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-bold">
                {formattedCurrency(results.principalAndInterest)} ({pAndIPct}%)
              </strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Property Taxes</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-bold">
                {formattedCurrency(results.monthlyPropertyTax)} ({taxPct}%)
              </strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Homeowner's Insurance</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-bold">
                {formattedCurrency(results.monthlyInsurance)} ({insPct}%)
              </strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">HOA Fees</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-bold">
                {formattedCurrency(results.monthlyHoa)} ({hoaPct}%)
              </strong>
            </div>
          </div>

          {/* Loan Total Highlights */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Total Loan Amount:</span>
              <strong className="text-slate-900 dark:text-white">{formattedCurrency(results.totalLoanAmount)}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Total Interest Paid over {inputs.loanTermYears} Yrs:</span>
              <strong className="text-slate-900 dark:text-white">{formattedCurrency(results.totalInterestPaid)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
