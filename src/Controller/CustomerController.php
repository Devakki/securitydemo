<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Form\CustomerType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Omines\DataTablesBundle\Adapter\Doctrine\ORMAdapter;
use Omines\DataTablesBundle\Column\TextColumn;
use Omines\DataTablesBundle\DataTableFactory;

class CustomerController extends AbstractController
{

    public function __construct(
        EntityManagerInterface $entityManager,
    ) {
        $this->entityManager  = $entityManager;
    }

    #[Route('/customer', name: 'customer')]
    public function index(Request $request): Response
    {
        $customer = new Customer(); 

        $addForm = $this->createForm(CustomerType::class, $customer);
        $addForm->handleRequest($request);
        
        if($addForm->isSubmitted())
        {

          $this->entityManager->persist($customer);
            $this->entityManager->flush();

            return $this->redirectToRoute('dashboard');
        }

         return $this->render('customer/index.html.twig', [
            'form'  => $addForm->createView(),
            'title' => 'Customer',
            'route' => ['list' => 'customer_list'],
        ]);
    }
    #[Route('/customer-list', name: 'customerList')]
    public function customerList(Request $request , DataTableFactory $dataTableFactory): Response
    {
                $table = $dataTableFactory->create()
                ->add('name', TextColumn::class)
                ->add('mobile', TextColumn::class)
                ->createAdapter(OrmAdapter::class, [
                    'entity' => Customer::class,
                ])
                ->handleRequest($request);

            if ($table->isCallback()) {
                return $table->getResponse();
            }

            return $this->render('customer/list.html.twig', ['title' => 'Customer','datatable' => $table]);

    }
}
