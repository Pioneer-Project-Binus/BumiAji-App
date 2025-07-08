import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/produk'
 */
const index001bfca3a656fb418beb4420fa158591 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index001bfca3a656fb418beb4420fa158591.url(options),
    method: 'get',
})

index001bfca3a656fb418beb4420fa158591.definition = {
    methods: ['get','head'],
    url: '/produk',
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/produk'
 */
index001bfca3a656fb418beb4420fa158591.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index001bfca3a656fb418beb4420fa158591.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/produk'
 */
index001bfca3a656fb418beb4420fa158591.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index001bfca3a656fb418beb4420fa158591.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/produk'
 */
index001bfca3a656fb418beb4420fa158591.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index001bfca3a656fb418beb4420fa158591.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/products'
 */
const indexcdff108606cb7e4bb2af83e29c4f29fb = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexcdff108606cb7e4bb2af83e29c4f29fb.url(options),
    method: 'get',
})

indexcdff108606cb7e4bb2af83e29c4f29fb.definition = {
    methods: ['get','head'],
    url: '/products',
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/products'
 */
indexcdff108606cb7e4bb2af83e29c4f29fb.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexcdff108606cb7e4bb2af83e29c4f29fb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/products'
 */
indexcdff108606cb7e4bb2af83e29c4f29fb.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexcdff108606cb7e4bb2af83e29c4f29fb.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:19
 * @route '/products'
 */
indexcdff108606cb7e4bb2af83e29c4f29fb.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexcdff108606cb7e4bb2af83e29c4f29fb.url(options),
    method: 'head',
})

export const index = {
    '/produk': index001bfca3a656fb418beb4420fa158591,
    '/products': indexcdff108606cb7e4bb2af83e29c4f29fb,
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/produk/{slug}'
 */
const show4ee204ed85b0615c55d988ac08e69642 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show4ee204ed85b0615c55d988ac08e69642.url(args, options),
    method: 'get',
})

show4ee204ed85b0615c55d988ac08e69642.definition = {
    methods: ['get','head'],
    url: '/produk/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/produk/{slug}'
 */
show4ee204ed85b0615c55d988ac08e69642.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show4ee204ed85b0615c55d988ac08e69642.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/produk/{slug}'
 */
show4ee204ed85b0615c55d988ac08e69642.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show4ee204ed85b0615c55d988ac08e69642.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/produk/{slug}'
 */
show4ee204ed85b0615c55d988ac08e69642.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show4ee204ed85b0615c55d988ac08e69642.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/products/view/{slug}'
 */
const show9c6c78afcd9b9556a0d485230f128ff7 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show9c6c78afcd9b9556a0d485230f128ff7.url(args, options),
    method: 'get',
})

show9c6c78afcd9b9556a0d485230f128ff7.definition = {
    methods: ['get','head'],
    url: '/products/view/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/products/view/{slug}'
 */
show9c6c78afcd9b9556a0d485230f128ff7.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show9c6c78afcd9b9556a0d485230f128ff7.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/products/view/{slug}'
 */
show9c6c78afcd9b9556a0d485230f128ff7.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show9c6c78afcd9b9556a0d485230f128ff7.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:179
 * @route '/products/view/{slug}'
 */
show9c6c78afcd9b9556a0d485230f128ff7.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show9c6c78afcd9b9556a0d485230f128ff7.url(args, options),
    method: 'head',
})

export const show = {
    '/produk/{slug}': show4ee204ed85b0615c55d988ac08e69642,
    '/products/view/{slug}': show9c6c78afcd9b9556a0d485230f128ff7,
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/products/create'
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
    url: '/products/create',
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/products/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/products/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/products/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:118
 * @route '/products'
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
    url: '/products',
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:118
 * @route '/products'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:118
 * @route '/products'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductController::exportMethod
 * @see app/Http/Controllers/ProductController.php:0
 * @route '/products/export'
 */
export const exportMethod = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ['get','head'],
    url: '/products/export',
}

/**
* @see \App\Http\Controllers\ProductController::exportMethod
 * @see app/Http/Controllers/ProductController.php:0
 * @route '/products/export'
 */
exportMethod.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::exportMethod
 * @see app/Http/Controllers/ProductController.php:0
 * @route '/products/export'
 */
exportMethod.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::exportMethod
 * @see app/Http/Controllers/ProductController.php:0
 * @route '/products/export'
 */
exportMethod.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::archived
 * @see app/Http/Controllers/ProductController.php:332
 * @route '/products/archived'
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
    url: '/products/archived',
}

/**
* @see \App\Http\Controllers\ProductController::archived
 * @see app/Http/Controllers/ProductController.php:332
 * @route '/products/archived'
 */
archived.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archived.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::archived
 * @see app/Http/Controllers/ProductController.php:332
 * @route '/products/archived'
 */
archived.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::archived
 * @see app/Http/Controllers/ProductController.php:332
 * @route '/products/archived'
 */
archived.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archived.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::restore
 * @see app/Http/Controllers/ProductController.php:361
 * @route '/products/{slug}/restore'
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
    url: '/products/{slug}/restore',
}

/**
* @see \App\Http\Controllers\ProductController::restore
 * @see app/Http/Controllers/ProductController.php:361
 * @route '/products/{slug}/restore'
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
* @see \App\Http\Controllers\ProductController::restore
 * @see app/Http/Controllers/ProductController.php:361
 * @route '/products/{slug}/restore'
 */
restore.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProductController::deletePermanent
 * @see app/Http/Controllers/ProductController.php:374
 * @route '/products/{slug}/delete-permanent'
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
    url: '/products/{slug}/delete-permanent',
}

/**
* @see \App\Http\Controllers\ProductController::deletePermanent
 * @see app/Http/Controllers/ProductController.php:374
 * @route '/products/{slug}/delete-permanent'
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
* @see \App\Http\Controllers\ProductController::deletePermanent
 * @see app/Http/Controllers/ProductController.php:374
 * @route '/products/{slug}/delete-permanent'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:220
 * @route '/products/{slug}/edit'
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
    url: '/products/{slug}/edit',
}

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:220
 * @route '/products/{slug}/edit'
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
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:220
 * @route '/products/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:220
 * @route '/products/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:245
 * @route '/products/{slug}'
 */
const update0cba029d50e47125a3214f2b5292d469 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update0cba029d50e47125a3214f2b5292d469.url(args, options),
    method: 'put',
})

update0cba029d50e47125a3214f2b5292d469.definition = {
    methods: ['put'],
    url: '/products/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:245
 * @route '/products/{slug}'
 */
update0cba029d50e47125a3214f2b5292d469.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update0cba029d50e47125a3214f2b5292d469.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:245
 * @route '/products/{slug}'
 */
update0cba029d50e47125a3214f2b5292d469.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update0cba029d50e47125a3214f2b5292d469.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:245
 * @route '/products/{slug}/update'
 */
const update4c9815caad8aaa671f52bd4158188027 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update4c9815caad8aaa671f52bd4158188027.url(args, options),
    method: 'post',
})

update4c9815caad8aaa671f52bd4158188027.definition = {
    methods: ['post'],
    url: '/products/{slug}/update',
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:245
 * @route '/products/{slug}/update'
 */
update4c9815caad8aaa671f52bd4158188027.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update4c9815caad8aaa671f52bd4158188027.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:245
 * @route '/products/{slug}/update'
 */
update4c9815caad8aaa671f52bd4158188027.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update4c9815caad8aaa671f52bd4158188027.url(args, options),
    method: 'post',
})

export const update = {
    '/products/{slug}': update0cba029d50e47125a3214f2b5292d469,
    '/products/{slug}/update': update4c9815caad8aaa671f52bd4158188027,
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:311
 * @route '/products/{slug}'
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
    url: '/products/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:311
 * @route '/products/{slug}'
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
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:311
 * @route '/products/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ProductController = { index, show, create, store, exportMethod, archived, restore, deletePermanent, edit, update, destroy, export: exportMethod }

export default ProductController