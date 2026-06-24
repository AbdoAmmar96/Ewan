<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');

        $leads = Lead::when($status && in_array($status, Lead::STATUSES), fn ($q) => $q->where('status', $status))
            ->latest()
            ->get();

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'filter' => $status,
            'counts' => [
                'all'      => Lead::count(),
                'new'      => Lead::where('status', 'new')->count(),
                'read'     => Lead::where('status', 'read')->count(),
                'replied'  => Lead::where('status', 'replied')->count(),
                'archived' => Lead::where('status', 'archived')->count(),
            ],
        ]);
    }

    public function show(Lead $lead)
    {
        if ($lead->status === 'new') {
            $lead->update(['status' => 'read']);
        }

        return Inertia::render('Admin/Leads/Show', ['lead' => $lead->fresh()]);
    }

    public function update(Request $request, Lead $lead)
    {
        $data = $request->validate([
            'status'     => ['required', Rule::in(Lead::STATUSES)],
            'admin_note' => ['nullable', 'string', 'max:5000'],
        ]);

        $lead->update($data);

        return back()->with('success', 'تم تحديث الطلب.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->route('admin.leads.index')->with('success', 'تم حذف الطلب.');
    }
}
