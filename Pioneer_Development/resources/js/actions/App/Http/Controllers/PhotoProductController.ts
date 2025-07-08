import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/foto-produk/{slug}'
 */
const show979d564baa13f46818584f18383d74a1 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show979d564baa13f46818584f18383d74a1.url(args, options),
    method: 'get',
})

show979d564baa13f46818584f18383d74a1.definition = {
    methods: ['get','head'],
    url: '/foto-produk/{slug}',
}

/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/foto-produk/{slug}'
 */
show979d564baa13f46818584f18383d74a1.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return show979d564baa13f46818584f18383d74a1.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/foto-produk/{slug}'
 */
show979d564baa13f46818584f18383d74a1.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show979d564baa13f46818584f18383d74a1.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/foto-produk/{slug}'
 */
show979d564baa13f46818584f18383d74a1.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show979d564baa13f46818584f18383d74a1.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/photo-products/{slug}'
 */
const showcb089c672e8f5c840d0b5ec689e0b985 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showcb089c672e8f5c840d0b5ec689e0b985.url(args, options),
    method: 'get',
})

showcb089c672e8f5c840d0b5ec689e0b985.definition = {
    methods: ['get','head'],
    url: '/photo-products/{slug}',
}

/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/photo-products/{slug}'
 */
showcb089c672e8f5c840d0b5ec689e0b985.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return showcb089c672e8f5c840d0b5ec689e0b985.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/photo-products/{slug}'
 */
showcb089c672e8f5c840d0b5ec689e0b985.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showcb089c672e8f5c840d0b5ec689e0b985.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotoProductController::show
 * @see app/Http/Controllers/PhotoProductController.php:155
 * @route '/photo-products/{slug}'
 */
showcb089c672e8f5c840d0b5ec689e0b985.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showcb089c672e8f5c840d0b5ec689e0b985.url(args, options),
    method: 'head',
})

export const show = {
    '/foto-produk/{slug}': show979d564baa13f46818584f18383d74a1,
    '/photo-products/{slug}': showcb089c672e8f5c840d0b5ec689e0b985,
}

/**
* @see \App\Http\Controllers\PhotoProductController::index
 * @see app/Http/Controllers/PhotoProductController.php:16
 * @route '/photo-products'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/photo-products',
}

/**
* @see \App\Http\Controllers\PhotoProductController::index
 * @see app/Http/Controllers/PhotoProductController.php:16
 * @route '/photo-products'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::index
 * @see app/Http/Controllers/PhotoProductController.php:16
 * @route '/photo-products'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotoProductController::index
 * @see app/Http/Controllers/PhotoProductController.php:16
 * @route '/photo-products'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhotoProductController::create
 * @see app/Http/Controllers/PhotoProductController.php:69
 * @route '/photo-products/create'
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/photo-products/create',
}

/**
* @see \App\Http\Controllers\PhotoProductController::create
 * @see app/Http/Controllers/PhotoProductController.php:69
 * @route '/photo-products/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::create
 * @see app/Http/Controllers/PhotoProductController.php:69
 * @route '/photo-products/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotoProductController::create
 * @see app/Http/Controllers/PhotoProductController.php:69
 * @route '/photo-products/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhotoProductController::store
 * @see app/Http/Controllers/PhotoProductController.php:80
 * @route '/photo-products'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/photo-products',
}

/**
* @see \App\Http\Controllers\PhotoProductController::store
 * @see app/Http/Controllers/PhotoProductController.php:80
 * @route '/photo-products'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::store
 * @see app/Http/Controllers/PhotoProductController.php:80
 * @route '/photo-products'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhotoProductController::archived
 * @see app/Http/Controllers/PhotoProductController.php:306
 * @route '/photo-products/archived'
 */
export const archived = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})

archived.definition = {
    methods: ['get','head'],
    url: '/photo-products/archived',
}

/**
* @see \App\Http\Controllers\PhotoProductController::archived
 * @see app/Http/Controllers/PhotoProductController.php:306
 * @route '/photo-products/archived'
 */
archived.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archived.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::archived
 * @see app/Http/Controllers/PhotoProductController.php:306
 * @route '/photo-products/archived'
 */
archived.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotoProductController::archived
 * @see app/Http/Controllers/PhotoProductController.php:306
 * @route '/photo-products/archived'
 */
archived.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archived.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhotoProductController::edit
 * @see app/Http/Controllers/PhotoProductController.php:191
 * @route '/photo-products/{slug}/edit'
 */
export const edit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/photo-products/{slug}/edit',
}

/**
* @see \App\Http\Controllers\PhotoProductController::edit
 * @see app/Http/Controllers/PhotoProductController.php:191
 * @route '/photo-products/{slug}/edit'
 */
edit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return edit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::edit
 * @see app/Http/Controllers/PhotoProductController.php:191
 * @route '/photo-products/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotoProductController::edit
 * @see app/Http/Controllers/PhotoProductController.php:191
 * @route '/photo-products/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhotoProductController::update
 * @see app/Http/Controllers/PhotoProductController.php:206
 * @route '/photo-products/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/photo-products/{slug}',
}

/**
* @see \App\Http\Controllers\PhotoProductController::update
 * @see app/Http/Controllers/PhotoProductController.php:206
 * @route '/photo-products/{slug}'
 */
update.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return update.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::update
 * @see app/Http/Controllers/PhotoProductController.php:206
 * @route '/photo-products/{slug}'
 */
update.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhotoProductController::destroy
 * @see app/Http/Controllers/PhotoProductController.php:276
 * @route '/photo-products/{slug}'
 */
export const destroy = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/photo-products/{slug}',
}

/**
* @see \App\Http\Controllers\PhotoProductController::destroy
 * @see app/Http/Controllers/PhotoProductController.php:276
 * @route '/photo-products/{slug}'
 */
destroy.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return destroy.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::destroy
 * @see app/Http/Controllers/PhotoProductController.php:276
 * @route '/photo-products/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PhotoProductController::restore
 * @see app/Http/Controllers/PhotoProductController.php:335
 * @route '/photo-products/{slug}/restore'
 */
export const restore = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

restore.definition = {
    methods: ['put'],
    url: '/photo-products/{slug}/restore',
}

/**
* @see \App\Http\Controllers\PhotoProductController::restore
 * @see app/Http/Controllers/PhotoProductController.php:335
 * @route '/photo-products/{slug}/restore'
 */
restore.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return restore.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::restore
 * @see app/Http/Controllers/PhotoProductController.php:335
 * @route '/photo-products/{slug}/restore'
 */
restore.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PhotoProductController::deletePermanent
 * @see app/Http/Controllers/PhotoProductController.php:348
 * @route '/photo-products/{slug}/delete-permanent'
 */
export const deletePermanent = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

deletePermanent.definition = {
    methods: ['delete'],
    url: '/photo-products/{slug}/delete-permanent',
}

/**
* @see \App\Http\Controllers\PhotoProductController::deletePermanent
 * @see app/Http/Controllers/PhotoProductController.php:348
 * @route '/photo-products/{slug}/delete-permanent'
 */
deletePermanent.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return deletePermanent.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotoProductController::deletePermanent
 * @see app/Http/Controllers/PhotoProductController.php:348
 * @route '/photo-products/{slug}/delete-permanent'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})
const PhotoProductController = { show, index, create, store, archived, edit, update, destroy, restore, deletePermanent }

export default PhotoProductController