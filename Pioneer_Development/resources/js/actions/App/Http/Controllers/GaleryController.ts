import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\GaleryController::show4a331a7d18ff98619a17871b9b9f3375
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /galeri/{slug}
 */
const show4a331a7d18ff98619a17871b9b9f3375 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show4a331a7d18ff98619a17871b9b9f3375.url(args, options),
    method: 'get',
})

show4a331a7d18ff98619a17871b9b9f3375.definition = {
    methods: ['get','head'],
    url: '\/galeri\/{slug}',
}

/**
 * @see \App\Http\Controllers\GaleryController::show4a331a7d18ff98619a17871b9b9f3375
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /galeri/{slug}
 */
show4a331a7d18ff98619a17871b9b9f3375.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show4a331a7d18ff98619a17871b9b9f3375.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::show4a331a7d18ff98619a17871b9b9f3375
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /galeri/{slug}
 */
show4a331a7d18ff98619a17871b9b9f3375.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show4a331a7d18ff98619a17871b9b9f3375.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GaleryController::show4a331a7d18ff98619a17871b9b9f3375
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /galeri/{slug}
 */
show4a331a7d18ff98619a17871b9b9f3375.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show4a331a7d18ff98619a17871b9b9f3375.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\GaleryController::show500f385ab5fd3505a716d2dc5a3fdb55
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /admin/galeries/{slug}/preview
 */
const show500f385ab5fd3505a716d2dc5a3fdb55 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show500f385ab5fd3505a716d2dc5a3fdb55.url(args, options),
    method: 'get',
})

show500f385ab5fd3505a716d2dc5a3fdb55.definition = {
    methods: ['get','head'],
    url: '\/admin\/galeries\/{slug}\/preview',
}

/**
 * @see \App\Http\Controllers\GaleryController::show500f385ab5fd3505a716d2dc5a3fdb55
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /admin/galeries/{slug}/preview
 */
show500f385ab5fd3505a716d2dc5a3fdb55.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show500f385ab5fd3505a716d2dc5a3fdb55.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::show500f385ab5fd3505a716d2dc5a3fdb55
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /admin/galeries/{slug}/preview
 */
show500f385ab5fd3505a716d2dc5a3fdb55.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show500f385ab5fd3505a716d2dc5a3fdb55.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GaleryController::show500f385ab5fd3505a716d2dc5a3fdb55
 * @see app\Http\Controllers\GaleryController.php:136
 * @route /admin/galeries/{slug}/preview
 */
show500f385ab5fd3505a716d2dc5a3fdb55.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show500f385ab5fd3505a716d2dc5a3fdb55.url(args, options),
    method: 'head',
})

export const show = {
    '\/galeri\/{slug}': show4a331a7d18ff98619a17871b9b9f3375,
    '\/admin\/galeries\/{slug}\/preview': show500f385ab5fd3505a716d2dc5a3fdb55,
}


/**
 * @see \App\Http\Controllers\GaleryController::index
 * @see app\Http\Controllers\GaleryController.php:18
 * @route /admin/galeries
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
    url: '\/admin\/galeries',
}

/**
 * @see \App\Http\Controllers\GaleryController::index
 * @see app\Http\Controllers\GaleryController.php:18
 * @route /admin/galeries
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::index
 * @see app\Http\Controllers\GaleryController.php:18
 * @route /admin/galeries
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GaleryController::index
 * @see app\Http\Controllers\GaleryController.php:18
 * @route /admin/galeries
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
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
    url: '\/admin\/galeries\/create',
}

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\GaleryController::store
 * @see app\Http\Controllers\GaleryController.php:68
 * @route /admin/galeries
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
    url: '\/admin\/galeries',
}

/**
 * @see \App\Http\Controllers\GaleryController::store
 * @see app\Http\Controllers\GaleryController.php:68
 * @route /admin/galeries
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::store
 * @see app\Http\Controllers\GaleryController.php:68
 * @route /admin/galeries
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\GaleryController::edit
 * @see app\Http\Controllers\GaleryController.php:171
 * @route /admin/galeries/{slug}/edit
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
    url: '\/admin\/galeries\/{slug}\/edit',
}

/**
 * @see \App\Http\Controllers\GaleryController::edit
 * @see app\Http\Controllers\GaleryController.php:171
 * @route /admin/galeries/{slug}/edit
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
 * @see \App\Http\Controllers\GaleryController::edit
 * @see app\Http\Controllers\GaleryController.php:171
 * @route /admin/galeries/{slug}/edit
 */
edit.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GaleryController::edit
 * @see app\Http\Controllers\GaleryController.php:171
 * @route /admin/galeries/{slug}/edit
 */
edit.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\GaleryController::update
 * @see app\Http\Controllers\GaleryController.php:194
 * @route /admin/galeries/{slug}
 */
export const update = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '\/admin\/galeries\/{slug}',
}

/**
 * @see \App\Http\Controllers\GaleryController::update
 * @see app\Http\Controllers\GaleryController.php:194
 * @route /admin/galeries/{slug}
 */
update.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::update
 * @see app\Http\Controllers\GaleryController.php:194
 * @route /admin/galeries/{slug}
 */
update.post = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\GaleryController::destroy
 * @see app\Http\Controllers\GaleryController.php:289
 * @route /admin/galeries/{slug}
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
    url: '\/admin\/galeries\/{slug}',
}

/**
 * @see \App\Http\Controllers\GaleryController::destroy
 * @see app\Http\Controllers\GaleryController.php:289
 * @route /admin/galeries/{slug}
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
 * @see \App\Http\Controllers\GaleryController::destroy
 * @see app\Http\Controllers\GaleryController.php:289
 * @route /admin/galeries/{slug}
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const GaleryController = { show, index, create, store, edit, update, destroy }

export default GaleryController