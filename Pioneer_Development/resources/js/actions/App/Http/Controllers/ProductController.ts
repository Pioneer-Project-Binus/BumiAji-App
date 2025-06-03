import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
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
    url: '\/produk',
}

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\ProductController::show
 * @see app\Http\Controllers\ProductController.php:124
 * @route /produk/{slug}
 */
export const show = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/produk\/{slug}',
}

/**
 * @see \App\Http\Controllers\ProductController::show
 * @see app\Http\Controllers\ProductController.php:124
 * @route /produk/{slug}
 */
show.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::show
 * @see app\Http\Controllers\ProductController.php:124
 * @route /produk/{slug}
 */
show.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProductController::show
 * @see app\Http\Controllers\ProductController.php:124
 * @route /produk/{slug}
 */
show.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\ProductController::create
 * @see app\Http\Controllers\ProductController.php:60
 * @route /admin/products/create
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
    url: '\/admin\/products\/create',
}

/**
 * @see \App\Http\Controllers\ProductController::create
 * @see app\Http\Controllers\ProductController.php:60
 * @route /admin/products/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::create
 * @see app\Http\Controllers\ProductController.php:60
 * @route /admin/products/create
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
 * @see app\Http\Controllers\ProductController.php:60
 * @route /admin/products/create
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
 * @see app\Http\Controllers\ProductController.php:68
 * @route /admin/products
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
    url: '\/admin\/products',
}

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app\Http\Controllers\ProductController.php:68
 * @route /admin/products
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app\Http\Controllers\ProductController.php:68
 * @route /admin/products
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\ProductController::edit
 * @see app\Http\Controllers\ProductController.php:150
 * @route /admin/products/{slug}/edit
 */
export const edit = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/admin\/products\/{slug}\/edit',
}

/**
 * @see \App\Http\Controllers\ProductController::edit
 * @see app\Http\Controllers\ProductController.php:150
 * @route /admin/products/{slug}/edit
 */
edit.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::edit
 * @see app\Http\Controllers\ProductController.php:150
 * @route /admin/products/{slug}/edit
 */
edit.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProductController::edit
 * @see app\Http\Controllers\ProductController.php:150
 * @route /admin/products/{slug}/edit
 */
edit.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\ProductController::update2d4ce42cfd518e3b63b12d13067a586e
 * @see app\Http\Controllers\ProductController.php:164
 * @route /admin/products/{slug}
 */
const update2d4ce42cfd518e3b63b12d13067a586e = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update2d4ce42cfd518e3b63b12d13067a586e.url(args, options),
    method: 'put',
})

update2d4ce42cfd518e3b63b12d13067a586e.definition = {
    methods: ['put'],
    url: '\/admin\/products\/{slug}',
}

/**
 * @see \App\Http\Controllers\ProductController::update2d4ce42cfd518e3b63b12d13067a586e
 * @see app\Http\Controllers\ProductController.php:164
 * @route /admin/products/{slug}
 */
update2d4ce42cfd518e3b63b12d13067a586e.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update2d4ce42cfd518e3b63b12d13067a586e.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::update2d4ce42cfd518e3b63b12d13067a586e
 * @see app\Http\Controllers\ProductController.php:164
 * @route /admin/products/{slug}
 */
update2d4ce42cfd518e3b63b12d13067a586e.put = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update2d4ce42cfd518e3b63b12d13067a586e.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\ProductController::update70bd497153ae0ccc1bc0acc272f2be93
 * @see app\Http\Controllers\ProductController.php:164
 * @route /admin/products/{slug}/update
 */
const update70bd497153ae0ccc1bc0acc272f2be93 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update70bd497153ae0ccc1bc0acc272f2be93.url(args, options),
    method: 'post',
})

update70bd497153ae0ccc1bc0acc272f2be93.definition = {
    methods: ['post'],
    url: '\/admin\/products\/{slug}\/update',
}

/**
 * @see \App\Http\Controllers\ProductController::update70bd497153ae0ccc1bc0acc272f2be93
 * @see app\Http\Controllers\ProductController.php:164
 * @route /admin/products/{slug}/update
 */
update70bd497153ae0ccc1bc0acc272f2be93.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update70bd497153ae0ccc1bc0acc272f2be93.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::update70bd497153ae0ccc1bc0acc272f2be93
 * @see app\Http\Controllers\ProductController.php:164
 * @route /admin/products/{slug}/update
 */
update70bd497153ae0ccc1bc0acc272f2be93.post = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update70bd497153ae0ccc1bc0acc272f2be93.url(args, options),
    method: 'post',
})

export const update = {
    '\/admin\/products\/{slug}': update2d4ce42cfd518e3b63b12d13067a586e,
    '\/admin\/products\/{slug}\/update': update70bd497153ae0ccc1bc0acc272f2be93,
}


/**
 * @see \App\Http\Controllers\ProductController::destroy
 * @see app\Http\Controllers\ProductController.php:220
 * @route /admin/products/{slug}
 */
export const destroy = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/admin\/products\/{slug}',
}

/**
 * @see \App\Http\Controllers\ProductController::destroy
 * @see app\Http\Controllers\ProductController.php:220
 * @route /admin/products/{slug}
 */
destroy.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::destroy
 * @see app\Http\Controllers\ProductController.php:220
 * @route /admin/products/{slug}
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const ProductController = { index, show, create, store, edit, update, destroy }

export default ProductController