import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileCheck, DollarSign, TrendingUp, CheckCircle, Clock, Search, Filter, X, Save, Eye, Download, ChevronDown, AlertTriangle, Plus, Trash2, Calendar, FileText, Upload, MapPin, Phone, Edit, UserPlus, Loader2, ExternalLink } from 'lucide-react';
import { dataService } from '../services/storage';
import { TestAttempt, TestPaper, User, UserRole } from '../types';

// --- Components ---
const StatCard = ({ label, value, subValue, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-black mt-2 text-slate-800">{value}</h3>
        {subValue && <p className={`text-xs font-bold mt-1 ${subValue.includes('+') ? 'text-green-600' : 'text-slate-400'}`}>{subValue}</p>}
      </div>
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

// ... EvaluationModal Component ...
const EvaluationModal = ({ attempt, test, onClose, onSave }: any) => {
  const [marks, setMarks] = useState(attempt.marksObtained || '');
  const [feedback, setFeedback] = useState(attempt.feedback || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(attempt.id, Number(marks), feedback);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-up">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-brand-dark px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <FileCheck size={20} className="text-brand-orange" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Evaluate Answer Sheet</h3>
              <p className="text-xs text-slate-400">ID: {attempt.id.toUpperCase().substring(0,8)}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
           {/* ... Student Details UI ... */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="bg-white p-4 rounded-xl border border-slate-200">
               <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Student ID</h4>
               <p className="font-bold text-slate-800 text-lg">{attempt.studentId}</p>
               <p className="text-sm text-slate-500">Submitted: {new Date(attempt.submittedAt).toLocaleString()}</p>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-200">
               <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Test Details</h4>
               <p className="font-bold text-brand-primary text-lg">{test?.title}</p>
               <p className="text-sm text-slate-500">{test?.subject} • Max Marks: {test?.totalMarks}</p>
             </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                 <FileText size={20} />
               </div>
               <div>
                  <h4 className="font-bold text-blue-900 text-sm">Student Answer Sheet</h4>
                  <p className="text-xs text-blue-700">PDF Document</p>
               </div>
            </div>
            {attempt.answerSheetUrl ? (
                <a 
                  href={attempt.answerSheetUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Eye size={16} /> View
                </a>
            ) : (
                <span className="text-xs text-red-500 font-bold">No file attached</span>
            )}
          </div>

          <form id="eval-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Marks Obtained</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  max={test?.totalMarks} 
                  min={0}
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="w-32 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none font-mono font-bold text-xl text-center"
                  required
                />
                <span className="text-slate-400 font-bold text-xl">/ {test?.totalMarks}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Evaluator Remarks / Feedback</label>
              <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Ex: Good presentation in Q2. Missed Section 144 reference in Q3..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none min-h-[120px] text-sm leading-relaxed"
                required
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="eval-form"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-brand-primary hover:bg-brand-dark shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
             {saving ? 'Saving...' : <><CheckCircle size={18} /> Submit Evaluation</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ... TestManager and StudentManager ...

const TestManager = ({ tests, onRefresh }: { tests: TestPaper[], onRefresh: () => void }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTest, setNewTest] = useState<Partial<TestPaper>>({
    course: 'Inter',
    status: 'Live',
    durationMinutes: 180,
    totalMarks: 100
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const testData: TestPaper = {
      id: '', // Generated by Firebase
      title: newTest.title || 'Untitled Test',
      subject: newTest.subject || 'General',
      course: newTest.course as any,
      totalMarks: Number(newTest.totalMarks) || 100,
      durationMinutes: Number(newTest.durationMinutes) || 180,
      scheduledDate: newTest.scheduledDate || new Date().toISOString().split('T')[0],
      status: 'Live',
      pdfUrl: '/mock-paper.pdf'
    };
    
    await dataService.addTest(testData);
    setIsCreating(false);
    setNewTest({ course: 'Inter', status: 'Live', durationMinutes: 180, totalMarks: 100 });
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure?')) {
      await dataService.deleteTest(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div><h3 className="text-xl font-bold text-slate-900">Manage Test Series</h3></div>
          <button onClick={() => setIsCreating(!isCreating)} className="bg-brand-primary text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-brand-dark">
            {isCreating ? <X size={18} /> : <Plus size={18} />} {isCreating ? 'Cancel' : 'Create New Test'}
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreate} className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Title" className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20" value={newTest.title || ''} onChange={e => setNewTest({...newTest, title: e.target.value})} required />
              <input type="text" placeholder="Subject" className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20" value={newTest.subject || ''} onChange={e => setNewTest({...newTest, subject: e.target.value})} required />
              <select className="p-3 border border-slate-300 rounded-lg" value={newTest.course} onChange={e => setNewTest({...newTest, course: e.target.value as any})}>
                  <option value="Foundation">Foundation</option>
                  <option value="Inter">Inter</option>
                  <option value="Final">Final</option>
              </select>
              <input type="number" placeholder="Marks" className="p-3 border border-slate-300 rounded-lg" value={newTest.totalMarks} onChange={e => setNewTest({...newTest, totalMarks: Number(e.target.value)})} />
            </div>
            <button type="submit" className="bg-brand-primary text-white px-6 py-2 rounded-xl font-bold text-sm">Publish Test</button>
          </form>
        )}

        {/* Existing Tests List */}
        <div className="overflow-hidden rounded-xl border border-slate-200">
           <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
              <tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Course</th><th className="px-6 py-4">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tests.map(test => (
                  <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{test.title}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold">{test.course}</span></td>
                    <td className="px-6 py-4"><button onClick={() => handleDelete(test.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={16}/></button></td>
                  </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

const StudentManager = ({ onRefresh }: { onRefresh: () => void }) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
      setLoading(true);
      const data = await dataService.getStudents();
      setStudents(data);
      setLoading(false);
  }

  const handleDelete = async (id: string) => {
      if(confirm("Delete student?")) {
          await dataService.deleteStudent(id);
          loadStudents();
          onRefresh();
      }
  }

  return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-fade-up">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Student Database</h3>
        {loading ? <div className="text-center p-4">Loading...</div> : (
             <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
                        <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">City</th><th className="px-6 py-4">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">{s.name}</td>
                                <td className="px-6 py-4 text-slate-500">{s.email}</td>
                                <td className="px-6 py-4 text-slate-500">{s.city || '-'}</td>
                                <td className="px-6 py-4"><button onClick={() => handleDelete(s.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        )}
      </div>
  )
};

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'students'>('overview');
  const [stats, setStats] = useState({ students: 0, totalUploads: 0, pending: 0, avgMarks: 0, passRate: 0 });
  const [submissions, setSubmissions] = useState<TestAttempt[]>([]);
  const [tests, setTests] = useState<TestPaper[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters & Search
  const [filterStatus, setFilterStatus] = useState<'All' | 'Submitted' | 'Evaluated'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttempt, setSelectedAttempt] = useState<TestAttempt | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const rawStats = await dataService.getStats();
        const allAttempts = await dataService.getAttempts();
        const allTests = await dataService.getTests();

        const evaluated = allAttempts.filter(a => a.status === 'Evaluated');
        const totalMarks = evaluated.reduce((sum, a) => sum + (a.marksObtained || 0), 0);
        const avgMarks = evaluated.length ? Math.round(totalMarks / evaluated.length) : 0;
        const passed = evaluated.filter(a => (a.marksObtained || 0) >= 40).length;
        const passRate = evaluated.length ? Math.round((passed / evaluated.length) * 100) : 0;

        setStats({ ...rawStats, avgMarks, passRate });
        setSubmissions(allAttempts.reverse());
        setTests(allTests);
        setLoading(false);
    };
    fetchData();
  }, [refresh]);

  // Prepare Chart Data
  const chartData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dayName = days[d.getDay()];
      const count = submissions.filter(s => {
        const subDate = new Date(s.submittedAt);
        return subDate.getDate() === d.getDate() && subDate.getMonth() === d.getMonth();
      }).length;
      data.push({ name: dayName, uploads: count, students: Math.floor(count * 1.5) + 2 });
    }
    return data;
  }, [submissions]);

  const filteredSubmissions = submissions.filter(s => {
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    const testName = tests.find(t => t.id === s.testId)?.title.toLowerCase() || '';
    const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          testName.includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateScore = async (id: string, marks: number, feedback: string) => {
    await dataService.updateAttemptStatus(id, 'Evaluated', marks, feedback);
    setRefresh(prev => prev + 1);
    setSelectedAttempt(null);
  };

  const getTest = (testId: string) => tests.find(t => t.id === testId);

  if (loading && activeTab === 'overview') return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">Overview of performance and evaluations.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
             <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}>Overview</button>
             <button onClick={() => setActiveTab('students')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}>Students</button>
             <button onClick={() => setActiveTab('tests')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'tests' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}>Tests</button>
          </div>
        </div>
      </div>

      {activeTab === 'tests' && <TestManager tests={tests} onRefresh={() => setRefresh(p => p + 1)} />}
      
      {activeTab === 'students' && <StudentManager onRefresh={() => setRefresh(p => p + 1)} />}

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid - Simplified for Async */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-up">
            <StatCard label="Total Revenue (Est.)" value={`₹${(stats.totalUploads * 499).toLocaleString()}`} subValue="+12% this month" icon={DollarSign} bg="bg-green-100" color="text-green-600" />
            <StatCard label="Active Students" value={stats.students} subValue="Total Registered" icon={Users} bg="bg-blue-100" color="text-blue-600" />
            <StatCard label="Pending Checks" value={stats.pending} subValue={stats.pending > 5 ? "High Workload" : "On Track"} icon={Clock} bg={stats.pending > 5 ? "bg-red-100" : "bg-orange-100"} color={stats.pending > 5 ? "text-red-600" : "text-orange-600"} />
            <StatCard label="Avg. Pass Rate" value={`${stats.passRate}%`} subValue={`Avg Score: ${stats.avgMarks}`} icon={CheckCircle} bg="bg-purple-100" color="text-purple-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 animate-fade-up">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg mb-6">Submission Activity</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFA239" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFA239" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="uploads" stroke="#FFA239" strokeWidth={3} fillOpacity={1} fill="url(#colorUploads)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
             <div className="bg-brand-primary p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
                <h3 className="font-bold text-xl mb-4 relative z-10">Quick Actions</h3>
                <div className="space-y-3 relative z-10">
                   <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-colors">
                     <Plus size={18} /> Create Announcement
                   </button>
                   <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-colors">
                     <Upload size={18} /> Upload Bulk Result
                   </button>
                   <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-colors">
                     <UserPlus size={18} /> Invite Teachers
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-up">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 text-lg">Recent Submissions</h3>
               <div className="flex gap-2">
                 <button onClick={() => setFilterStatus('All')} className={`px-3 py-1 text-xs font-bold rounded-lg ${filterStatus === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>All</button>
                 <button onClick={() => setFilterStatus('Submitted')} className={`px-3 py-1 text-xs font-bold rounded-lg ${filterStatus === 'Submitted' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>Pending</button>
                 <button onClick={() => setFilterStatus('Evaluated')} className={`px-3 py-1 text-xs font-bold rounded-lg ${filterStatus === 'Evaluated' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>Done</button>
               </div>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
                  <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Marks</th><th className="px-6 py-4 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400 font-medium">No submissions found.</td></tr>
                  ) : filteredSubmissions.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 font-mono text-slate-600">#{attempt.id.substring(0,6)}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold flex items-center w-fit gap-1 ${
                           attempt.status === 'Evaluated' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                         }`}>
                           {attempt.status === 'Evaluated' ? <CheckCircle size={10} /> : <Clock size={10} />}
                           {attempt.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-slate-500">{new Date(attempt.submittedAt).toLocaleDateString()}</td>
                       <td className="px-6 py-4 font-bold text-slate-700">{attempt.marksObtained || '-'}</td>
                       <td className="px-6 py-4 text-right"><button onClick={() => setSelectedAttempt(attempt)} className="text-brand-primary font-bold hover:bg-brand-primary/10 px-3 py-1.5 rounded-lg transition-colors">Evaluate</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>
          </div>
        </>
      )}

      {selectedAttempt && <EvaluationModal attempt={selectedAttempt} test={getTest(selectedAttempt.testId)} onClose={() => setSelectedAttempt(null)} onSave={handleUpdateScore} />}
    </div>
  );
};
