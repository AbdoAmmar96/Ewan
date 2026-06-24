<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => ['required', 'string', 'max:120'],
            'phone'   => ['required', 'string', 'max:30'],
            'email'   => ['nullable', 'email', 'max:160'],
            'service' => ['required', 'string', 'max:80'],
            'message' => ['required', 'string', 'max:3000'],
        ], [
            'name.required'    => 'من فضلك اكتب اسمك',
            'phone.required'   => 'رقم الهاتف مطلوب',
            'email.email'      => 'من فضلك أدخل بريداً إلكترونياً صحيحاً',
            'service.required' => 'اختر نوع الخدمة',
            'message.required' => 'اكتب تفاصيل مشروعك',
        ]);

        // Persist the quote request so it shows up in the admin dashboard.
        $lead = Lead::create($data + ['status' => 'new']);

        logger()->info('Ewan quote request', $data);

        // Notify the company by e-mail. Uses the configured MAIL_* driver; the
        // default "log" driver just writes to storage/logs so nothing breaks.
        try {
            $to = Setting::get('contact')['email'] ?? config('mail.from.address');
            if ($to) {
                Mail::raw(
                    "طلب عرض سعر جديد:\n\n".collect($data)->map(fn ($v, $k) => "$k: $v")->implode("\n"),
                    fn ($m) => $m->to($to)->subject('طلب عرض سعر — إيوان #'.$lead->id)
                );
            }
        } catch (\Throwable $e) {
            logger()->warning('Lead mail failed: '.$e->getMessage());
        }

        return back()->with('success', 'تم استلام طلبك بنجاح.');
    }
}
