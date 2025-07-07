<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::where('isDeleted', false)->orderBy('sentAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('email', 'like', "%{$searchTerm}%")
                  ->orWhere('subject', 'like', "%{$searchTerm}%")
                  ->orWhere('slug', 'like', "%{$searchTerm}%")
                  ->orWhere('message', 'like', "%{$searchTerm}%");
            });
        }

        $contacts = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $contacts,
                'message' => 'Pesan kontak berhasil diambil'
            ]);
        }

        if (Auth::check()) {
            return Inertia::render('Contacts/Index', [
                'contacts' => $contacts,
                'filters' => $request->only(['search']),
            ]);
        } else {
            return Inertia::render('Contacts/Public/Index', [
                'contacts' => $contacts,
                'filters' => $request->only(['search']),
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validasi gagal'
                ], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', 'Pesan gagal dikirim, periksa kembali isian Anda.');
        }

        $contact = new Contact();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->subject = $request->subject;
        $contact->message = $request->message;

        $baseSlug = Str::slug($request->subject ?: 'kontak-' . Str::random(5));
        $slug = $baseSlug;
        $counter = 1;
        while (Contact::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $contact->slug = $slug;
        $contact->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $contact,
                'message' => 'Pesan Anda berhasil dikirim!'
            ], 201);
        }

        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim!');
    }

    public function show(Request $request, string $slug)
    {
        $contact = Contact::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $contact,
                'message' => 'Pesan kontak berhasil diambil'
            ]);
        }

        if (Auth::check()) {
            return Inertia::render('Contacts/Show', [
                'contact' => $contact
            ]);
        } else {
            return Inertia::render('Contacts/Public/Show', [
                'contact' => $contact
            ]);
        }
    }

    public function destroy(Request $request, string $slug)
    {
        $contact = Contact::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $contact->isDeleted = true;
        $contact->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Pesan kontak berhasil dihapus'
            ]);
        }

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Pesan kontak berhasil dihapus.');
    }

    public function archivedIndex(Request $request)
    {
        $query = Contact::where('isDeleted', true)->orderBy('sentAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('email', 'like', "%{$searchTerm}%")
                ->orWhere('subject', 'like', "%{$searchTerm}%")
                ->orWhere('slug', 'like', "%{$searchTerm}%")
                ->orWhere('message', 'like', "%{$searchTerm}%");
            });
        }

        $contacts = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $contacts,
                'message' => 'Kontak yang diarsipkan berhasil diambil'
            ]);
        }

        return Inertia::render('Contacts/Archived', [
            'contacts' => $contacts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function restore(Request $request, string $slug)
    {
        $contact = Contact::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $contact->isDeleted = false;
        $contact->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kontak berhasil dipulihkan'
            ]);
        }

        return redirect()->back()->with('success', 'Kontak berhasil dipulihkan.');
    }

    public function deletePermanent(Request $request, string $slug)
    {
        $contact = Contact::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $contact->delete(); // Soft delete nonaktif, maka ini akan menghapus permanen dari DB

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kontak berhasil dihapus permanen'
            ]);
        }

        return redirect()->back()->with('success', 'Kontak berhasil dihapus permanen.');
    }

}
