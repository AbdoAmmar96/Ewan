<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Advantage;
use App\Models\CompanyValue;
use App\Models\Faq;
use App\Models\Package;
use App\Models\ProcessStep;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\WhyFeature;
use App\Support\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /** Icon names available in the front-end icon set. */
    private const ICONS = [
        'passenger', 'freight', 'home', 'escalator', 'wrench', 'upgrade', 'shield', 'clock',
        'medal', 'gauge', 'globe', 'support', 'search', 'ruler', 'truck', 'tool', 'target',
        'eye', 'gem', 'star', 'pin', 'mail', 'phone', 'check',
    ];

    /** Definition of every CMS resource (model + fields shown/validated). */
    public static function configs(): array
    {
        $icon = ['name' => 'icon', 'label' => 'الأيقونة', 'type' => 'select', 'options' => self::ICONS];
        $active = ['name' => 'active', 'label' => 'مفعّل', 'type' => 'boolean'];
        $sort = ['name' => 'sort', 'label' => 'الترتيب', 'type' => 'number'];

        return [
            'services' => [
                'model' => Service::class, 'label' => 'الخدمات', 'singular' => 'خدمة', 'title' => 'title',
                'fields' => [
                    ['name' => 'title', 'label' => 'العنوان', 'type' => 'text', 'required' => true],
                    ['name' => 'image', 'label' => 'صورة الخدمة (اختياري — تظهر بدل الأيقونة)', 'type' => 'image'],
                    $icon,
                    ['name' => 'description', 'label' => 'الوصف المختصر', 'type' => 'textarea', 'required' => true],
                    ['name' => 'body', 'label' => 'التفاصيل الكاملة (تظهر عند «اعرف المزيد»)', 'type' => 'textarea'],
                    ['name' => 'features', 'label' => 'المميزات', 'type' => 'tags'],
                    $sort, $active,
                ],
            ],
            'projects' => [
                'model' => Project::class, 'label' => 'المشاريع', 'singular' => 'مشروع', 'title' => 'title',
                'fields' => [
                    ['name' => 'title', 'label' => 'اسم المشروع', 'type' => 'text', 'required' => true],
                    ['name' => 'category', 'label' => 'التصنيف', 'type' => 'select', 'options' => ['residential', 'commercial', 'hotel', 'medical', 'industrial']],
                    ['name' => 'category_label', 'label' => 'اسم التصنيف', 'type' => 'text', 'required' => true],
                    ['name' => 'location', 'label' => 'الموقع', 'type' => 'text', 'required' => true],
                    ['name' => 'detail', 'label' => 'الوصف المختصر', 'type' => 'text', 'required' => true],
                    ['name' => 'body', 'label' => 'التفاصيل الكاملة (تظهر عند الضغط على المشروع)', 'type' => 'textarea'],
                    ['name' => 'image', 'label' => 'صورة المشروع (اختياري)', 'type' => 'image'],
                    ['name' => 'motif', 'label' => 'الخلفية البديلة (عند عدم وجود صورة)', 'type' => 'select', 'options' => ['towers', 'shaft', 'arch', 'deco', 'freight']],
                    ['name' => 'tint', 'label' => 'الدرجة', 'type' => 'select', 'options' => ['a', 'b', 'c', 'd', 'e']],
                    $sort, $active,
                ],
            ],
            'packages' => [
                'model' => Package::class, 'label' => 'الباقات', 'singular' => 'باقة', 'title' => 'name',
                'fields' => [
                    ['name' => 'name', 'label' => 'اسم الباقة', 'type' => 'text', 'required' => true],
                    ['name' => 'description', 'label' => 'الوصف', 'type' => 'text', 'required' => true],
                    ['name' => 'amount', 'label' => 'السعر/النوع', 'type' => 'text', 'required' => true],
                    ['name' => 'featured', 'label' => 'الأكثر طلباً', 'type' => 'boolean'],
                    ['name' => 'features', 'label' => 'المميزات', 'type' => 'tags'],
                    $sort, $active,
                ],
            ],
            'faqs' => [
                'model' => Faq::class, 'label' => 'الأسئلة الشائعة', 'singular' => 'سؤال', 'title' => 'question',
                'fields' => [
                    ['name' => 'question', 'label' => 'السؤال', 'type' => 'text', 'required' => true],
                    ['name' => 'answer', 'label' => 'الإجابة', 'type' => 'textarea', 'required' => true],
                    $sort, $active,
                ],
            ],
            'testimonials' => [
                'model' => Testimonial::class, 'label' => 'آراء العملاء', 'singular' => 'رأي', 'title' => 'name',
                'fields' => [
                    ['name' => 'quote', 'label' => 'الرأي', 'type' => 'textarea', 'required' => true],
                    ['name' => 'name', 'label' => 'الاسم', 'type' => 'text', 'required' => true],
                    ['name' => 'role', 'label' => 'الصفة', 'type' => 'text', 'required' => true],
                    ['name' => 'initials', 'label' => 'الحروف (أيقونة)', 'type' => 'text', 'required' => true],
                    $sort, $active,
                ],
            ],
            'why' => [
                'model' => WhyFeature::class, 'label' => 'لماذا إيوان', 'singular' => 'ميزة', 'title' => 'title',
                'fields' => [
                    ['name' => 'title', 'label' => 'العنوان', 'type' => 'text', 'required' => true],
                    $icon,
                    ['name' => 'description', 'label' => 'الوصف', 'type' => 'textarea', 'required' => true],
                    $sort, $active,
                ],
            ],
            'process' => [
                'model' => ProcessStep::class, 'label' => 'خطوات العمل', 'singular' => 'خطوة', 'title' => 'title',
                'fields' => [
                    ['name' => 'title', 'label' => 'العنوان', 'type' => 'text', 'required' => true],
                    $icon,
                    ['name' => 'description', 'label' => 'الوصف', 'type' => 'textarea', 'required' => true],
                    $sort, $active,
                ],
            ],
            'values' => [
                'model' => CompanyValue::class, 'label' => 'الرسالة والرؤية', 'singular' => 'عنصر', 'title' => 'title',
                'fields' => [
                    ['name' => 'title', 'label' => 'العنوان', 'type' => 'text', 'required' => true],
                    $icon,
                    ['name' => 'description', 'label' => 'الوصف', 'type' => 'textarea', 'required' => true],
                    $sort, $active,
                ],
            ],
            'team' => [
                'model' => TeamMember::class, 'label' => 'الفريق', 'singular' => 'عضو', 'title' => 'role',
                'fields' => [
                    ['name' => 'initials', 'label' => 'الحروف (أيقونة)', 'type' => 'text', 'required' => true],
                    ['name' => 'role', 'label' => 'الدور', 'type' => 'text', 'required' => true],
                    $sort, $active,
                ],
            ],
            'advantages' => [
                'model' => Advantage::class, 'label' => 'لماذا تتعامل معنا', 'singular' => 'نقطة', 'title' => 'bold',
                'fields' => [
                    ['name' => 'bold', 'label' => 'العنوان', 'type' => 'text', 'required' => true],
                    ['name' => 'sub', 'label' => 'الوصف', 'type' => 'textarea', 'required' => true],
                    $sort, $active,
                ],
            ],
        ];
    }

    private function config(string $resource): array
    {
        $configs = self::configs();
        abort_unless(isset($configs[$resource]), 404);

        return $configs[$resource];
    }

    public function index(string $resource)
    {
        $cfg = $this->config($resource);
        $model = $cfg['model'];

        return Inertia::render('Admin/Resource', [
            'resource' => $resource,
            'meta' => [
                'label' => $cfg['label'],
                'singular' => $cfg['singular'],
                'title' => $cfg['title'],
                'fields' => $cfg['fields'],
            ],
            'items' => $model::orderBy('sort')->orderBy('id')->get(),
        ]);
    }

    public function store(string $resource, Request $request)
    {
        $cfg = $this->config($resource);
        $data = $this->handleImages($cfg, $resource, $request, $this->validateData($cfg, $request));
        $cfg['model']::create($data);
        SiteContent::flush();

        return back()->with('success', 'تمت الإضافة بنجاح.');
    }

    public function update(string $resource, int $id, Request $request)
    {
        $cfg = $this->config($resource);
        $item = $cfg['model']::findOrFail($id);
        $data = $this->handleImages($cfg, $resource, $request, $this->validateData($cfg, $request));
        $item->update($data);
        SiteContent::flush();

        return back()->with('success', 'تم الحفظ بنجاح.');
    }

    /** Move any uploaded image fields into public/uploads/{resource}. */
    private function handleImages(array $cfg, string $resource, Request $request, array $data): array
    {
        foreach ($cfg['fields'] as $f) {
            if ($f['type'] !== 'image' || ! $request->hasFile($f['name'])) {
                continue;
            }
            $request->validate([$f['name'] => ['image', 'max:6144']]);
            $file = $request->file($f['name']);
            $dir = public_path('uploads/'.$resource);
            if (! is_dir($dir)) {
                @mkdir($dir, 0775, true);
            }
            $filename = $f['name'].'-'.uniqid().'.'.$file->getClientOriginalExtension();
            $file->move($dir, $filename);
            $data[$f['name']] = '/uploads/'.$resource.'/'.$filename;
        }

        return $data;
    }

    public function destroy(string $resource, int $id)
    {
        $cfg = $this->config($resource);
        $cfg['model']::findOrFail($id)->delete();
        SiteContent::flush();

        return back()->with('success', 'تم الحذف.');
    }

    /** Quick show/hide toggle straight from the list. */
    public function toggle(string $resource, int $id)
    {
        $cfg = $this->config($resource);
        $item = $cfg['model']::findOrFail($id);
        $item->update(['active' => ! $item->active]);
        SiteContent::flush();

        return back()->with('success', $item->active ? 'أصبح ظاهراً في الموقع.' : 'تم إخفاؤه من الموقع.');
    }

    private function validateData(array $cfg, Request $request): array
    {
        $rules = [];
        $messages = [];
        foreach ($cfg['fields'] as $f) {
            if ($f['type'] === 'image') {
                continue; // uploaded files are handled in handleImages()
            }
            $name = $f['name'];
            $rule = [];
            $rule[] = ($f['required'] ?? false) ? 'required' : 'nullable';
            switch ($f['type']) {
                case 'number':  $rule[] = 'integer'; break;
                case 'boolean': $rule = ['boolean']; break;
                case 'tags':    $rule = ['nullable', 'array']; break;
                case 'select':  if (! empty($f['options'])) { $rule[] = 'in:'.implode(',', $f['options']); } break;
                default:        $rule[] = 'string'; $rule[] = 'max:5000';
            }
            $rules[$name] = $rule;
            if ($f['required'] ?? false) {
                $messages[$name.'.required'] = 'حقل «'.$f['label'].'» مطلوب';
            }
        }

        $data = $request->validate($rules, $messages);

        // normalise checkboxes / tags that may be absent
        foreach ($cfg['fields'] as $f) {
            if ($f['type'] === 'boolean') {
                $data[$f['name']] = $request->boolean($f['name']);
            }
            if ($f['type'] === 'tags' && ! isset($data[$f['name']])) {
                $data[$f['name']] = [];
            }
            if ($f['type'] === 'number' && ! isset($data[$f['name']])) {
                $data[$f['name']] = 0;
            }
        }

        return $data;
    }
}
