<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str; // Import Str
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth; // Untuk Auth::check() jika perlu

class ContactController extends Controller
{
// Menampilkan daftar pesan kontak (untuk admin)
public function index(Request $request)
{
$query = Contact::where('isDeleted', false)
->orderBy('sentAt', 'desc');

    if ($request->has('search')) {
        $searchTerm = $request->search;
        $query->where(function($q) use ($searchTerm) {
            $q->where('name', 'like', "%{$searchTerm}%")
              ->orWhere('email', 'like', "%{$searchTerm}%")
              ->orWhere('subject', 'like', "%{$searchTerm}%")
              ->orWhere('slug', 'like', "%{$searchTerm}%") // Bisa cari berdasarkan slug juga
              ->orWhere('message', 'like', "%{$searchTerm}%");
        });
    }

    $contacts = $query->paginate(10);

    if ($request->wantsJson()) {
        return response()->json(['success' => true, 'data' => $contacts, 'message' => 'Pesan kontak berhasil diambil']);
    }

    return Inertia::render('Admin/Contacts/Index', [ // Path view admin
        'contacts' => $contacts,
        'filters' => $request->only(['search']),
        // 'can' => [...] // Tambahkan hak akses jika perlu
    ]);
}

// Method untuk menyimpan pesan dari form kontak publik (slug dibuat di sini)
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:20',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ], [
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama maksimal 255 karakter.',
        
        'email.required' => 'Email wajib diisi.',
        'email.email' => 'Format email tidak valid.',
        'email.max' => 'Email maksimal 255 karakter.',
        
        'phone.string' => 'Nomor telepon harus berupa teks.',
        'phone.max' => 'Nomor telepon maksimal 20 karakter.',
        
        'subject.required' => 'Subjek wajib diisi.',
        'subject.string' => 'Subjek harus berupa teks.',
        'subject.max' => 'Subjek maksimal 255 karakter.',
        
        'message.required' => 'Pesan wajib diisi.',
        'message.string' => 'Pesan harus berupa teks.',
    ]);

    if ($validator->fails()) {
        if ($request->wantsJson()) {
            return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
        }
        return redirect()->back()->withErrors($validator)->withInput()->with('error', 'Pesan gagal dikirim, periksa kembali isian Anda.');
    }

    $contact = new Contact();
    $contact->name = $request->name;
    $contact->email = $request->email;
    $contact->phone = $request->phone;
    $contact->subject = $request->subject;
    $contact->message = $request->message;
    // sentAt diatur otomatis oleh database (useCurrent)

    $baseSlug = Str::slug($request->subject ?: 'kontak-' . Str::random(5)); 
    $slug = $baseSlug;
    $counter = 1;
    while (Contact::where('slug', $slug)->exists()) {
        $slug = $baseSlug . '-' . $counter++;
    }
    $contact->slug = $slug;

    $contact->save();

    if ($request->wantsJson()) {
        return response()->json(['success' => true, 'data' => $contact, 'message' => 'Pesan Anda berhasil dikirim!'], 201);
    }
    return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim!');
}

public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
{
    $contact = Contact::where('slug', $slug) // Cari berdasarkan slug
        ->where('isDeleted', false)
        ->firstOrFail();

    if ($request->wantsJson()) {
        return response()->json(['success' => true, 'data' => $contact, 'message' => 'Pesan kontak berhasil diambil']);
    }
    return Inertia::render('Admin/Contacts/Show', [ // Path view admin
        'contact' => $contact,
        // 'can' => [...]
    ]);
}

public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
{
    $contact = Contact::where('slug', $slug) // Cari berdasarkan slug
        ->where('isDeleted', false)
        ->firstOrFail();

    $contact->isDeleted = true;
    $contact->save();

    if ($request->wantsJson()) {
        return response()->json(['success' => true, 'message' => 'Pesan kontak berhasil dihapus'], 200);
    }
    return redirect()->route('admin.contacts.index')->with('success', 'Pesan kontak berhasil dihapus.');
}
}