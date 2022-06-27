<?php
declare(strict_types=1);

namespace App\Datatables;

use App\Entity\TblSubscriptionPackage;
use App\Entity\Customer;
use Closure;
use Exception;
use Sg\DatatablesBundle\Datatable\AbstractDatatable;
use Sg\DatatablesBundle\Datatable\Column\ActionColumn;
use Sg\DatatablesBundle\Datatable\Column\BooleanColumn;
use Sg\DatatablesBundle\Datatable\Column\Column;
use Sg\DatatablesBundle\Datatable\Column\ImageColumn;
use Sg\DatatablesBundle\Datatable\Column\MultiselectColumn;
use Sg\DatatablesBundle\Datatable\Editable\SelectEditable;
use Sg\DatatablesBundle\Datatable\Filter\SelectFilter;
use Sg\DatatablesBundle\Datatable\Filter\TextFilter;
use Sg\DatatablesBundle\Datatable\Style;

/**
 * Class CustomerDatatable
 *
 * @package App\Datatables
 */
class CustomerDatatable extends AbstractDatatable
{
  

    /**
     * @param array $options
     *
     * @return void
     * @throws Exception
     */
    public function buildDatatable(array $options = []): void
    {
        $this->ajax->set(['pipeline' => 2]);
        $this->options->set([
            'classes'                       => 'cls-sgDatatable ' . Style::BOOTSTRAP_4_STYLE,
            'stripe_classes'                => ['strip1', 'strip2', 'strip3'],
            'individual_filtering'          => false,
            'individual_filtering_position' => 'head',
            'order'                         => [[1, 'desc']],
            'order_cells_top'               => true,
            'search_in_non_visible_columns' => false,
        ]);

        $this->columnBuilder
            ->add('name', Column::class, ['title' => 'name'])
            ->add('mobile', Column::class, ['title' => 'mobile'])
            ->add('address', Column::class, ['title' => 'address'])
            ->add('pannumber', Column::class, ['title' => 'pannumber'])
            ->add(null, ActionColumn::class, [
                'title'      => 'Actions',
                'start_html' => '<div class="start_actions">',
                'end_html'   => '</div>',
                'class_name' => 'text-center',
                'actions'    => [
                    [
                        'route'            => 'edit_customer',
                        'label'            => '',
                        'route_parameters' => [
                            'id' => 'id'
                        ],
                        "icon"             => "glyphicon glyphicon-edit",
                        'attributes'       => [
                            'rel'   => 'tooltip',
                            'title' => 'Edit',
                            'class' => 'btn btn-default btn-xs margin-r-5',
                            'role'  => 'button',
                        ],
                        'start_html'       => '<div class="start_show_action">',
                        'end_html'         => '</div>',
                    ]
                ]
            ]);
           
    }

    /**
     * @return string
     */
    public function getEntity(): string
    {
        return Customer::class;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'customer_datatable';
    }
}
