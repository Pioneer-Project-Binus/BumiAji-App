import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismPhotoController::showa0c08903cbacadbdcfe06ad4707cb581
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /foto-wisata/{slug}
 */
const showa0c08903cbacadbdcfe06ad4707cb581 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa0c08903cbacadbdcfe06ad4707cb581.url(args, options),
    method: 'get',
})

showa0c08903cbacadbdcfe06ad4707cb581.definition = {
    methods: ['get','head'],
    url: '\/foto-wisata\/{slug}',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::showa0c08903cbacadbdcfe06ad4707cb581
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /foto-wisata/{slug}
 */
showa0c08903cbacadbdcfe06ad4707cb581.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showa0c08903cbacadbdcfe06ad4707cb581.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::showa0c08903cbacadbdcfe06ad4707cb581
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /foto-wisata/{slug}
 */
showa0c08903cbacadbdcfe06ad4707cb581.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa0c08903cbacadbdcfe06ad4707cb581.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::showa0c08903cbacadbdcfe06ad4707cb581
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /foto-wisata/{slug}
 */
showa0c08903cbacadbdcfe06ad4707cb581.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showa0c08903cbacadbdcfe06ad4707cb581.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::show16da77ff97c26d9c5a004757e620fba5
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /admin/tourism-photos/{slug}
 */
const show16da77ff97c26d9c5a004757e620fba5 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show16da77ff97c26d9c5a004757e620fba5.url(args, options),
    method: 'get',
})

show16da77ff97c26d9c5a004757e620fba5.definition = {
    methods: ['get','head'],
    url: '\/admin\/tourism-photos\/{slug}',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::show16da77ff97c26d9c5a004757e620fba5
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /admin/tourism-photos/{slug}
 */
show16da77ff97c26d9c5a004757e620fba5.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show16da77ff97c26d9c5a004757e620fba5.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::show16da77ff97c26d9c5a004757e620fba5
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /admin/tourism-photos/{slug}
 */
show16da77ff97c26d9c5a004757e620fba5.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show16da77ff97c26d9c5a004757e620fba5.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::show16da77ff97c26d9c5a004757e620fba5
 * @see app\Http\Controllers\TourismPhotoController.php:0
 * @route /admin/tourism-photos/{slug}
 */
show16da77ff97c26d9c5a004757e620fba5.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show16da77ff97c26d9c5a004757e620fba5.url(args, options),
    method: 'head',
})

export const show = {
    '\/foto-wisata\/{slug}': showa0c08903cbacadbdcfe06ad4707cb581,
    '\/admin\/tourism-photos\/{slug}': show16da77ff97c26d9c5a004757e620fba5,
}


/**
 * @see \App\Http\Controllers\TourismPhotoController::index
 * @see app\Http\Controllers\TourismPhotoController.php:17
 * @route /admin/tourism-photos
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
    url: '\/admin\/tourism-photos',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::index
 * @see app\Http\Controllers\TourismPhotoController.php:17
 * @route /admin/tourism-photos
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::index
 * @see app\Http\Controllers\TourismPhotoController.php:17
 * @route /admin/tourism-photos
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::index
 * @see app\Http\Controllers\TourismPhotoController.php:17
 * @route /admin/tourism-photos
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\TourismPhotoController::create
 * @see app\Http\Controllers\TourismPhotoController.php:54
 * @route /admin/tourism-photos/create
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
    url: '\/admin\/tourism-photos\/create',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::create
 * @see app\Http\Controllers\TourismPhotoController.php:54
 * @route /admin/tourism-photos/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::create
 * @see app\Http\Controllers\TourismPhotoController.php:54
 * @route /admin/tourism-photos/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::create
 * @see app\Http\Controllers\TourismPhotoController.php:54
 * @route /admin/tourism-photos/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\TourismPhotoController::store
 * @see app\Http\Controllers\TourismPhotoController.php:66
 * @route /admin/tourism-photos
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
    url: '\/admin\/tourism-photos',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::store
 * @see app\Http\Controllers\TourismPhotoController.php:66
 * @route /admin/tourism-photos
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::store
 * @see app\Http\Controllers\TourismPhotoController.php:66
 * @route /admin/tourism-photos
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
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
    url: '\/admin\/tourism-photos\/{slug}\/edit',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
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
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
 */
edit.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
 */
edit.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\TourismPhotoController::update
 * @see app\Http\Controllers\TourismPhotoController.php:122
 * @route /admin/tourism-photos/{slug}
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
    url: '\/admin\/tourism-photos\/{slug}',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::update
 * @see app\Http\Controllers\TourismPhotoController.php:122
 * @route /admin/tourism-photos/{slug}
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
 * @see \App\Http\Controllers\TourismPhotoController::update
 * @see app\Http\Controllers\TourismPhotoController.php:122
 * @route /admin/tourism-photos/{slug}
 */
update.post = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app\Http\Controllers\TourismPhotoController.php:168
 * @route /admin/tourism-photos/{slug}
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
    url: '\/admin\/tourism-photos\/{slug}',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app\Http\Controllers\TourismPhotoController.php:168
 * @route /admin/tourism-photos/{slug}
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
 * @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app\Http\Controllers\TourismPhotoController.php:168
 * @route /admin/tourism-photos/{slug}
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const TourismPhotoController = { show, index, create, store, edit, update, destroy }

export default TourismPhotoController